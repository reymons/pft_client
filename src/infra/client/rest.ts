import { DomainError } from "@/domain/error";
import { JWTService } from "@/infra/jwt-service";

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
        const res = await fetch(`${this.baseURL}${url}`, {
            method,
            headers: {
                ...conf?.headers,
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.jwtService.getAccessToken()}`,
            },
            body: JSON.stringify(body),
        });
        if (!res.ok) {
            const err = (await res.json()) as ErrorEntity;
            const httpErr = new HTTPError(err.statusCode, err.message);
            throw new DomainError(err.message, httpErr);
        }
        return res.json() as Promise<T>;
    }

    async get<T>(url: string, conf?: RequestConfig): Promise<T> {
        return this.request("get", url, undefined, conf);
    }

    async post<T>(url: string, body: unknown, conf?: RequestConfig): Promise<T> {
        return this.request("post", url, body, conf);
    }
}
