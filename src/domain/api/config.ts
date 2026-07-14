import { IAPIFactory } from "@/domain/ports/api/factory";

type APIState = {
    factory: IAPIFactory | null;
    configured: boolean;
    testEnv: boolean;
};

const state: APIState = {
    factory: null,
    configured: false,
    testEnv: false,
};

export function getAPIFactory(): IAPIFactory | null {
    return state.factory;
}

export function isTestEnv() {
    return state.testEnv;
}

type Config = {
    factory: IAPIFactory;
    testEnv?: boolean;
};

export function configureAPI(conf: Config) {
    if (state.configured) {
        throw new Error("API must be configured only once");
    }
    state.configured = true;
    state.factory = conf.factory;
    state.testEnv = conf.testEnv ?? false;
}
