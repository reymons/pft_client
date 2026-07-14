import { IAuthAPI } from "@/domain/ports/api/auth";

type Config = {
    onSignIn?: (name: string, password: string) => void;
    onSignUp?: (name: string, password: string) => void;
    onLogOut?: () => void;
};

export class MockAuthAPI implements IAuthAPI {
    constructor(private readonly conf: Config) {}

    async signUp(name: string, password: string): Promise<void> {
        this.conf.onSignUp?.(name, password);
    }

    async signIn(name: string, password: string): Promise<void> {
        this.conf.onSignIn?.(name, password);
    }

    async logOut(): Promise<void> {
        this.conf.onLogOut?.();
    }
}
