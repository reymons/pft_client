import { flexRender, getCoreRowModel, Table as ReactTable, TableOptions, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { DataTableSkeleton } from "./data-table-skeleton";
import { cn } from "@/lib/utils";

type Options<T> = Omit<TableOptions<T>, "getCoreRowModel">;

type Props<T> = Options<T> & {
    className?: string;
    isLoading?: boolean;
    renderBefore?: (table: ReactTable<T>) => React.ReactNode;
    total: number;
};

export const DataTable = <T,>({ className, isLoading, renderBefore, total, state, ...opts }: Props<T>) => {
    const table = useReactTable({
        ...opts,
        state,
        getCoreRowModel: getCoreRowModel(),
        pageCount: state?.pagination?.pageSize ? Math.ceil(total / state?.pagination?.pageSize) : -1,
    });

    if (isLoading) {
        return (
            <>
                {renderBefore?.(table)}
                <DataTableSkeleton table={table} />
            </>
        );
    }

    return (
        <>
            {renderBefore?.(table)}
            <div className={cn("custom-scrollbar", className)}>
                <Table className="w-full">
                    <TableHeader>
                        {table.getHeaderGroups().map((hg) => (
                            <TableRow key={hg.id}>
                                {hg.headers.map((hdr) => (
                                    <TableHead key={hdr.id} style={{ width: hdr.getSize() }}>
                                        {hdr.isPlaceholder && null}
                                        {!hdr.isPlaceholder &&
                                            flexRender(hdr.column.columnDef.header, hdr.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {!table.getRowModel().rows.length && (
                            <TableRow>
                                <TableCell colSpan={opts.columns.length} className="h-24 text-center">
                                    No available transactions
                                </TableCell>
                            </TableRow>
                        )}
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="truncate overflow-hidden whitespace-nowrap">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};
