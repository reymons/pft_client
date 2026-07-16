import { Model, ModelId } from "./model";

export class UserModel extends Model {
    readonly id: number;
    readonly name: string;
    readonly createdAt: Date;

    constructor(id: ModelId, name: string, createdAt: Date) {
        super(id);
        this.name = name;
        this.createdAt = createdAt;
    }

    get fullName() {
        return this.name;
    }
}
