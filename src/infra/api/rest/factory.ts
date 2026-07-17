import { ScopedMutator } from "swr";
import { RESTClient } from "@/infra/client/rest";
import { IAPIFactory } from "@/domain/ports/api/factory";
import { BudgetsAPI } from "./budgets";
import { AuthAPI } from "./auth";
import { UsersAPI } from "./users";
import { CategoriesAPI } from "./categories";
import { TransactionsAPI } from "./transactions";

export class APIFactory implements IAPIFactory {
    private budgets: BudgetsAPI | null = null;
    private auth: AuthAPI | null = null;
    private users: UsersAPI | null = null;
    private categories: CategoriesAPI | null = null;
    private transactions: TransactionsAPI | null = null;

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
            this.auth = new AuthAPI(this.client, usersAPI, this.mutate);
        }
        return this.auth;
    }

    getUsersAPI() {
        if (!this.users) {
            this.users = new UsersAPI(this.client, this.mutate);
        }
        return this.users;
    }

    getCategoriesAPI() {
        if (!this.categories) {
            this.categories = new CategoriesAPI(this.client);
        }
        return this.categories;
    }

    getTransactionsAPI() {
        if (!this.transactions) {
            this.transactions = new TransactionsAPI(this.client);
        }
        return this.transactions;
    }
}
