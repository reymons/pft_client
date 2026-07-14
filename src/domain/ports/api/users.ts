import { UserModel } from "@/domain/models/user";
import { APIHookReturn } from "./common";

export interface IUsersAPI {
    useCurrentUser(): APIHookReturn<UserModel>;
}
