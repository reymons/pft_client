import { createContext, createElement } from "react";
import { IAuthAPI } from "@/domain/ports/api/auth";
import { IBudgetsAPI } from "@/domain/ports/api/budgets";
import { IUsersAPI } from "@/domain/ports/api/users";
import { ICategoriesAPI } from "../ports/api/categories";

export type ContextValue = {
    api: {
        auth?: IAuthAPI;
        budgets?: IBudgetsAPI;
        users?: IUsersAPI;
        categories?: ICategoriesAPI;
    };
};

export const APIContext = createContext<ContextValue | null>(null);

type Props = {
    children: React.ReactNode;
    api: ContextValue["api"];
};

export const APIProvider = ({ children, api }: Props) => {
    const value: ContextValue = { api };
    return createElement(APIContext, { value }, children);
};
