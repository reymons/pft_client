import { IAuthAPI } from "@/domain/ports/api/auth";
import { SignInEntity } from "./entity/auth";
import { mapUserEntityToModel } from "./entity/user";
import { UsersAPI } from "./users";
import { Fetcher } from "./fetcher";
import { API } from "./api";

export class AuthAPI extends API implements IAuthAPI {
    constructor(
        protected readonly fetcher: Fetcher,
        private readonly usersAPI: UsersAPI,
    ) {
        super(fetcher);
    }

    async signIn(name: string, password: string): Promise<void> {
        const ent = await this.fetcher.client.post<SignInEntity>("/auth/sign-in", { name, password });
        this.fetcher.client.setAccessToken(ent.accessToken, ent.accessTokenTTL);
        await this.usersAPI.setCurrentUser(mapUserEntityToModel(ent.user));
    }

    async signUp(name: string, password: string): Promise<void> {
        const ent = await this.fetcher.client.post<SignInEntity>("/auth/sign-up", { name, password });
        this.fetcher.client.setAccessToken(ent.accessToken, ent.accessTokenTTL);
        await this.usersAPI.setCurrentUser(mapUserEntityToModel(ent.user));
    }

    async logOut(): Promise<void> {
        this.fetcher.client.clearAuthInfo();
        await this.fetcher.mutate(() => true, undefined, { revalidate: false });
    }
}
