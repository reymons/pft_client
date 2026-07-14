import { mutate } from "swr";
import "@testing-library/jest-dom/vitest";
import { configureAPI } from "@/domain/api/config";
import { RESTClient } from "@/infra/client/rest";
import { APIFactory } from "@/infra/api/rest/factory";
import { JWTService } from "@/infra/jwt-service";

const restClient = new RESTClient({ baseURL: "", jwtService: new JWTService() });
const apiFactory = new APIFactory(restClient, mutate);

configureAPI({
    factory: apiFactory,
    testEnv: true,
});
