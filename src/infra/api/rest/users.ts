import { ScopedMutator } from "swr";
import swrImmutable from "swr/immutable";
import { UserModel } from "@/domain/models/user";
import { IUsersAPI } from "@/domain/ports/api/users";
import { APIHookReturn } from "@/domain/ports/api/common";
import { UserEntity } from "./entity/user";
import { RESTClient } from "@/infra/client/rest";

export class UsersAPI implements IUsersAPI {
    constructor(
        private readonly client: RESTClient,
        private readonly mutate: ScopedMutator,
    ) {}

    private toModel(ent: UserEntity): UserModel {
        const m = new UserModel();
        m.id = ent.id;
        m.name = ent.name;
        m.createdAt = new Date(ent.createdAt);
        return m;
    }

    useCurrentUser(): APIHookReturn<UserModel> {
        const { data, isLoading, error } = swrImmutable<UserModel>("/users/me", {
            fetcher: async () => {
                const ent = await this.client.get<UserEntity>("/users/me");
                return this.toModel(ent);
            },
            errorRetryCount: 0,
        });
        return [data ?? null, { isLoading, error }];
    }

    async setCurrentUser(user: UserModel | null): Promise<void> {
        await this.mutate("/users/me", user, { revalidate: false });
    }
}
