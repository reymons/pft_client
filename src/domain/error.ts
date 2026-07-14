export class DomainError extends Error {
    readonly wrappedError: Error | null = null;

    constructor(message: string, wrappedError?: Error) {
        super(message);
        this.wrappedError = wrappedError ?? null;
    }
}
