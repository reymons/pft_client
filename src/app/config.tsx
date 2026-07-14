"use client";
import { mutate } from "swr";
import { configureAPI } from "@/domain/api/config";
import { APIFactory } from "@/infra/api/rest/factory";
import { RESTClient } from "@/infra/client/rest";
import { JWTService } from "@/infra/jwt-service";

const restClient = new RESTClient({
    baseURL: "http://localhost:7474/api/v1",
    jwtService: new JWTService(),
});
const apiFactory = new APIFactory(restClient, mutate);
configureAPI({ factory: apiFactory });

export const AppConfig = () => {
    return null;
};
