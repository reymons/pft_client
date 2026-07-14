import { ScopedMutator } from "swr";
import { RESTClient } from "@/infra/client/rest";
import { IAPIFactory } from "@/domain/ports/api/factory";
import { BudgetsAPI } from "./budgets";
import { AuthAPI } from "./auth";
import { UsersAPI } from "./users";

export class APIFactory implements IAPIFactory {
    private budgets: BudgetsAPI | null = null;
    private auth: AuthAPI | null = null;
    private users: UsersAPI | null = null;

    constructor(
        private readonly client: RESTClient,
        private readonly mutate: ScopedMutator,
    ) {}

    getBudgetsAPI() {
        if (!this.budgets) {
            this.budgets = new BudgetsAPI(this.client, this.mutate);
        }
        return this.budgets;
    }

    getAuthAPI() {
        if (!this.auth) {
            const usersAPI = this.getUsersAPI();
            this.auth = new AuthAPI(this.client, usersAPI);
        }
        return this.auth;
    }

    getUsersAPI() {
        if (!this.users) {
            this.users = new UsersAPI(this.client, this.mutate);
        }
        return this.users;
    }
}
