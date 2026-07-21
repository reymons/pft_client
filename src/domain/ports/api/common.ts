import { DomainError } from "@/domain/error";

export type APIHookReturnState = {
    isLoading: boolean;
    error: DomainError | null;
};

export type APIHookReturn<T> = [T | null, APIHookReturnState];

export type APIHookPaginatedReturn<T> = [T[], number, APIHookReturnState];

export type PaginationQuery = {
    page?: number;
    pageSize?: number;
};

export enum SortDirection {
    DESC = "desc",
    ASC = "asc",
}

export type SortQuery<T extends string> = {
    dir?: SortDirection;
    sortBy?: T;
};

export type PaginationWithSortQuery<T extends string> = PaginationQuery & SortQuery<T>;
