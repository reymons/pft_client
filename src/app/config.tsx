"use client";
import { mutate } from "swr";
import { configureAPI } from "@/domain/api/config";
import { APIFactory } from "@/infra/api/rest/factory";
import { JWTService } from "@/infra/jwt-service";
import { Fetcher } from "@/infra/api/rest/fetcher";
import { RESTClient } from "@/infra/client/rest";

const restClient = new RESTClient({
    baseURL: "http://localhost:7474/api/v1",
    jwtService: new JWTService(),
});
const fetcher = new Fetcher(restClient, mutate);
const apiFactory = new APIFactory(fetcher);
configureAPI({ factory: apiFactory });

export const AppConfig = () => {
    return null;
};
