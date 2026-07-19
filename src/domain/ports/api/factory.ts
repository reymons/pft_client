import { IAuthAPI } from "./auth";
import { IBudgetsAPI } from "./budgets";
import { ICategoriesAPI } from "./categories";
import { IStatsAPI } from "./stats";
import { ITransactionsAPI } from "./transactions";
import { IUsersAPI } from "./users";

export interface IAPIFactory {
    getAuthAPI(): IAuthAPI;

    getBudgetsAPI(): IBudgetsAPI;

    getUsersAPI(): IUsersAPI;

    getCategoriesAPI(): ICategoriesAPI;

    getTransactionsAPI(): ITransactionsAPI;

    getStatsAPI(): IStatsAPI;
}
