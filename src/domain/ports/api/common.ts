import { DomainError } from "@/domain/error";

export type APIHookReturn<T> = [
    T | null,
    {
        isLoading: boolean;
        error: DomainError | null;
    },
];
