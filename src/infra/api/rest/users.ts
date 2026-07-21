import { UserModel } from "@/domain/models/user";
import { IUsersAPI } from "@/domain/ports/api/users";
import { UserEntity } from "./entity/user";
import { API } from "./api";

export class UsersAPI extends API implements IUsersAPI {
    useCurrentUser() {
        return this.fetcher.useData({
            route: { path: "/users/me" },
            fetcher: async (route, client) => {
                const ent = await client.get<UserEntity>(route);
                return new UserModel(ent.id, ent.name, new Date(ent.createdAt));
            },
            immutable: true,
            errorRetryCount: 0,
        });
    }

    async setCurrentUser(user: UserModel | null): Promise<void> {
        await this.fetcher.mutate("/users/me", user, false);
    }
}
