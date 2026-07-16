import { ScopedMutator } from "swr";
import { IAuthAPI } from "@/domain/ports/api/auth";
import { SignInEntity } from "./entity/auth";
import { RESTClient } from "@/infra/client/rest";
import { UsersAPI } from "./users";
import { mapUserEntityToModel } from "./entity/user";

export class AuthAPI implements IAuthAPI {
    constructor(
        private readonly client: RESTClient,
        private readonly usersAPI: UsersAPI,
        private readonly mutate: ScopedMutator,
    ) {}

    async signIn(name: string, password: string): Promise<void> {
        const ent = await this.client.post<SignInEntity>("/auth/sign-in", { name, password });
        this.client.setAccessToken(ent.accessToken, ent.accessTokenTTL);
        await this.usersAPI.setCurrentUser(mapUserEntityToModel(ent.user));
    }

    async signUp(name: string, password: string): Promise<void> {
        const ent = await this.client.post<SignInEntity>("/auth/sign-up", { name, password });
        this.client.setAccessToken(ent.accessToken, ent.accessTokenTTL);
        await this.usersAPI.setCurrentUser(mapUserEntityToModel(ent.user));
    }

    async logOut(): Promise<void> {
        this.client.clearAuthInfo();
        await this.mutate(() => true, undefined, { revalidate: false });
    }
}
