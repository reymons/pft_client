import { Model, ModelId } from "./model";

export enum CategoryType {
    Default = "default",
    Groceries = "groceries",
    Sports = "sports",
    Food = "food",
    Furniture = "furniture",
}

export const categoryName: Record<CategoryType, string> = {
    [CategoryType.Default]: "Default",
    [CategoryType.Groceries]: "Groceries",
    [CategoryType.Sports]: "Sports",
    [CategoryType.Food]: "Food",
    [CategoryType.Furniture]: "Furniture",
};

export class CategoryModel extends Model {
    readonly type: CategoryType;
    readonly name: string;

    constructor(id: ModelId, type: CategoryType, name: string) {
        super(id);
        this.type = type;
        this.name = name;
    }

    get isDefault() {
        return this.type === CategoryType.Default;
    }
}
