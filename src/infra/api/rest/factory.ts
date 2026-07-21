import { IAPIFactory } from "@/domain/ports/api/factory";
import { BudgetsAPI } from "./budgets";
import { AuthAPI } from "./auth";
import { UsersAPI } from "./users";
import { CategoriesAPI } from "./categories";
import { TransactionsAPI } from "./transactions";
import { StatsAPI } from "./stats";
import { Fetcher } from "./fetcher";

export class APIFactory implements IAPIFactory {
    private budgets: BudgetsAPI | null = null;
    private auth: AuthAPI | null = null;
    private users: UsersAPI | null = null;
    private categories: CategoriesAPI | null = null;
    private transactions: TransactionsAPI | null = null;
    private stats: StatsAPI | null = null;

    constructor(private readonly fetcher: Fetcher) {}

    getBudgetsAPI() {
        if (!this.budgets) {
            this.budgets = new BudgetsAPI(this.fetcher);
        }
        return this.budgets;
    }

    getAuthAPI() {
        if (!this.auth) {
            const usersAPI = this.getUsersAPI();
            this.auth = new AuthAPI(this.fetcher, usersAPI);
        }
        return this.auth;
    }

    getUsersAPI() {
        if (!this.users) {
            this.users = new UsersAPI(this.fetcher);
        }
        return this.users;
    }

    getCategoriesAPI() {
        if (!this.categories) {
            this.categories = new CategoriesAPI(this.fetcher);
        }
        return this.categories;
    }

    getTransactionsAPI() {
        if (!this.transactions) {
            this.transactions = new TransactionsAPI(this.fetcher);
        }
        return this.transactions;
    }

    getStatsAPI() {
        if (!this.stats) {
            this.stats = new StatsAPI(this.fetcher);
        }
        return this.stats;
    }
}
