import { IAuthAPI } from "./auth";
import { IBudgetsAPI } from "./budgets";
import { IUsersAPI } from "./users";

export interface IAPIFactory {
    getAuthAPI(): IAuthAPI;

    getBudgetsAPI(): IBudgetsAPI;

    getUsersAPI(): IUsersAPI;
}
