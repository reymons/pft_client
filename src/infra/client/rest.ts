import { DomainError } from "@/domain/error";
import { JWTService } from "@/infra/jwt-service";
import { ErrorEntity, HTTPError } from "./error";

type RequestConfig = {
    headers?: HeadersInit;
};

type RESTClientConfig = {
    baseURL: string;
    jwtService: JWTService;
};

export class RESTClient {
    private readonly baseURL: string;
    private readonly jwtService: JWTService;

    constructor(conf: RESTClientConfig) {
        this.baseURL = conf.baseURL;
        this.jwtService = conf.jwtService;
    }

    setAccessToken(token: string, ttl: number) {
        this.jwtService.setAccessToken(token, ttl);
    }

    clearAuthInfo(): void {
        this.jwtService.clearAccessToken();
    }

    private async request<T>(method: string, url: string, body?: unknown, conf?: RequestConfig): Promise<T> {
        const headers = new Headers(conf?.headers);

        let reqBody: string | undefined;
        const accessToken = this.jwtService.getAccessToken();
        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
        }
        if (typeof body === "object" && body !== null) {
            headers.set("Content-Type", "application/json");
            reqBody = JSON.stringify(body);
        }

        const res = await fetch(`${this.baseURL}${url}`, {
            method,
            headers,
            body: reqBody,
        });
        if (!res.ok) {
            const err = (await res.json()) as ErrorEntity;
            const httpErr = new HTTPError(err.statusCode, err.message);
            throw new DomainError(err.message, httpErr);
        }
        const ct = res.headers.get("Content-Type");
        if (ct && /^application\/json/.test(ct)) {
            return res.json() as Promise<T>;
        }
        return undefined as T;
    }

    async get<T>(url: string, conf?: RequestConfig): Promise<T> {
        return this.request("get", url, undefined, conf);
    }

    async post<T>(url: string, body: unknown, conf?: RequestConfig): Promise<T> {
        return this.request("post", url, body, conf);
    }

    async delete<T>(url: string, body?: unknown, conf?: RequestConfig): Promise<T> {
        return this.request("delete", url, body, conf);
    }
}
