import { CategoryModel } from "@/domain/models/category";
import { TransactionType } from "@/domain/models/transaction";
import { SortDirection } from "@/domain/ports/api/common";
import { UseCurrentTrxQuery } from "@/domain/ports/api/transactions";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";

type UseCurrentTrxFilters = Pick<UseCurrentTrxQuery, "name" | "description" | "type" | "categoryIds">;

type UseCurrentTrxSorting = Pick<UseCurrentTrxQuery, "sortBy" | "dir">;

export function filtersToQuery(filters: ColumnFiltersState): UseCurrentTrxFilters {
    const r: UseCurrentTrxFilters = {};
    for (const f of filters) {
        switch (f.id) {
            case "name":
                r.name = f.value as string;
                break;
            case "description":
                r.description = f.value as string;
                break;
            case "type":
                r.type = f.value as TransactionType;
                break;
            case "category":
                const categories = f.value as CategoryModel[];
                r.categoryIds = categories.map((c) => c.id);
                break;
        }
    }
    return r;
}

export function sortingToQuery(sorting: SortingState): UseCurrentTrxSorting {
    const r: UseCurrentTrxSorting = {};
    const sort = sorting.at(0);
    if (sort && sort.id === "addedAt") {
        r.dir = sort.desc ? SortDirection.DESC : SortDirection.ASC;
        r.sortBy = "date";
    }
    return r;
}
