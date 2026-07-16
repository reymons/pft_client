import { CategoryModel } from "@/domain/models/category";
import { APIHookReturn } from "./common";

export interface ICategoriesAPI {
    useDefault(): APIHookReturn<CategoryModel[]>;
}
