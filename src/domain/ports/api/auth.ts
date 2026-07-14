export interface IAuthAPI {
    signIn(name: string, password: string): Promise<void>;

    signUp(name: string, password: string): Promise<void>;

    logOut(): Promise<void>;
}
