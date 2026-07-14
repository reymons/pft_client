import { IAPIFactory } from "@/domain/ports/api/factory";
import { getAPIFactory, isTestEnv } from "./config";
import { useContext } from "react";
import { APIContext, ContextValue } from "./context";

const useAPIFactory = (): IAPIFactory => {
    const factory = getAPIFactory();
    if (!factory) throw new Error("Configure API");
    return factory;
};

const useSelectAPI = <T>(cb1: (f: IAPIFactory) => T, cb2: (api: ContextValue["api"]) => T | undefined): T => {
    const ctx = useContext(APIContext);
    const factory = useAPIFactory();
    if (isTestEnv()) {
        if (!ctx) throw new Error("Wrap your app in APIProvider");
        const api = cb2(ctx.api) ?? cb1(factory);
        if (!api) throw new Error("Provide an API instance");
        return api;
    }
    return cb1(factory);
};

export const useAuthAPI = () => {
    return useSelectAPI(
        (f) => f.getAuthAPI(),
        (api) => api.auth,
    );
};

export const useBudgetsAPI = () => {
    return useSelectAPI(
        (f) => f.getBudgetsAPI(),
        (api) => api.budgets,
    );
};

export const useUsersAPI = () => {
    return useSelectAPI(
        (f) => f.getUsersAPI(),
        (api) => api.users,
    );
};
