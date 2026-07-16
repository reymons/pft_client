import swr from "swr";
import { CategoryModel } from "@/domain/models/category";
import { ICategoriesAPI } from "@/domain/ports/api/categories";
import { APIHookReturn } from "@/domain/ports/api/common";
import { RESTClient } from "@/infra/client/rest";
import { CategoryEntity, mapCategoryEntityToModel } from "./entity/category";

export class CategoriesAPI implements ICategoriesAPI {
    constructor(private readonly client: RESTClient) {}

    useDefault(): APIHookReturn<CategoryModel[]> {
        const { data, isLoading, error } = swr<CategoryModel[]>("/categories/default", {
            fetcher: async () => {
                const cats = await this.client.get<CategoryEntity[]>("/categories/default");
                return cats.map(mapCategoryEntityToModel);
            },
        });
        return [data ?? null, { isLoading, error }];
    }
}
