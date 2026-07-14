export class UserModel {
    id: number;
    name: string;
    createdAt: Date;

    get fullName() {
        return this.name;
    }
}
