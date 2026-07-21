"use client";
import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef, ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import { useTransactionsAPI } from "@/domain/api/hooks";
import { TransactionModel, transactionName } from "@/domain/models/transaction";
import { CategoryBadge } from "@/domain/features/categories/components/category-badge";
import { PAGE_SIZE } from "@/domain/api/const";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/date";
import { filtersToQuery, sortingToQuery } from "../utils/table";
import { TransactionsTablePanel } from "./transactions-table-panel";

const columns: ColumnDef<TransactionModel>[] = [
    {
        accessorKey: "name",
        header: "Name",
        size: 150,
        cell: ({ row }) => row.original.name,
    },
    {
        accessorKey: "type",
        header: "Type",
        size: 100,
        cell: ({ row }) => (
            <Badge variant={row.original.isIncome ? "touchSomeGrass" : "destructive"}>
                {transactionName[row.original.type]}
            </Badge>
        ),
    },
    {
        accessorKey: "amount",
        header: "Amount",
        size: 100,
        cell: ({ row }) => `$${row.original.amount}`,
    },
    {
        accessorKey: "category",
        header: "Category",
        size: 100,
        cell: ({ row }) => <CategoryBadge category={row.original.category} />,
    },
    {
        accessorKey: "addedAt",
        header: ({ column }) => (
            <button
                className="flex gap-1 items-center"
                type="button"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </button>
        ),
        size: 120,
        cell: ({ row }) => formatDate(row.original.addedAt),
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => row.original.description,
    },
];

export const TransactionsTable = () => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([{ id: "category", value: [] }]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: PAGE_SIZE,
    });

    const trxAPI = useTransactionsAPI();
    const [transactions, totalTransactions] = trxAPI.useCurrent({
        page: pagination.pageIndex,
        pageSize: pagination.pageSize,
        ...filtersToQuery(columnFilters),
        ...sortingToQuery(sorting),
    });

    const resetPagination = () => setPagination((p) => ({ ...p, pageIndex: 0 }));

    return (
        <DataTable
            className="h-[500px]"
            manualPagination
            manualSorting
            manualFiltering
            data={transactions}
            columns={columns}
            total={totalTransactions}
            state={{ sorting, columnFilters, pagination }}
            onPaginationChange={setPagination}
            onColumnFiltersChange={(filters) => {
                setColumnFilters(filters);
                resetPagination();
            }}
            onSortingChange={(sorting) => {
                setSorting(sorting);
                resetPagination();
            }}
            renderBefore={(table) => <TransactionsTablePanel table={table} />}
        />
    );
};
