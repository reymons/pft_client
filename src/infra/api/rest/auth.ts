import { IAuthAPI } from "@/domain/ports/api/auth";
import { UserModel } from "@/domain/models/user";
import { UserEntity } from "./entity/user";
import { SignInEntity } from "./entity/auth";
import { RESTClient } from "@/infra/client/rest";
import { UsersAPI } from "./users";

export class AuthAPI implements IAuthAPI {
    constructor(
        private readonly client: RESTClient,
        private readonly usersAPI: UsersAPI,
    ) {}

    private toModel(user: UserEntity): UserModel {
        const m = new UserModel();
        m.id = user.id;
        m.name = user.name;
        m.createdAt = new Date(user.createdAt);
        return m;
    }

    async signIn(name: string, password: string): Promise<void> {
        const ent = await this.client.post<SignInEntity>("/auth/sign-in", { name, password });
        this.client.setAccessToken(ent.accessToken, ent.accessTokenTTL);
        await this.usersAPI.setCurrentUser(this.toModel(ent.user));
    }

    async signUp(name: string, password: string): Promise<void> {
        const ent = await this.client.post<SignInEntity>("/auth/sign-up", { name, password });
        this.client.setAccessToken(ent.accessToken, ent.accessTokenTTL);
        await this.usersAPI.setCurrentUser(this.toModel(ent.user));
    }

    async logOut(): Promise<void> {
        this.client.clearAuthInfo();
        await this.usersAPI.setCurrentUser(null);
    }
}
