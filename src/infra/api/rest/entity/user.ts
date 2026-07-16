import { UserModel } from "@/domain/models/user";

export type UserEntity = {
    id: number;
    name: string;
    createdAt: string;
};

export function mapUserEntityToModel(ent: UserEntity): UserModel {
    return new UserModel(ent.id, ent.name, new Date(ent.createdAt));
}
