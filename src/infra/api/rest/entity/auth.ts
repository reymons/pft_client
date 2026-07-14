import { UserEntity } from "./user";

export type SignInEntity = {
    user: UserEntity;
    accessToken: string;
    accessTokenTTL: number;
};

export type SignUpEntity = SignInEntity;
