import Cookie from "js-cookie";

export class JWTService {
    private readonly ACCESS_TOKEN_COOKIE = "accessToken";

    setAccessToken(token: string, ttl: number) {
        Cookie.set(this.ACCESS_TOKEN_COOKIE, token, {
            sameSite: "lax",
            secure: false,
            expires: ttl,
        });
    }

    getAccessToken(): string | null {
        return Cookie.get(this.ACCESS_TOKEN_COOKIE) ?? null;
    }

    clearAccessToken(): void {
        Cookie.remove(this.ACCESS_TOKEN_COOKIE);
    }
}
