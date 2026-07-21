import { ICategoriesAPI } from "@/domain/ports/api/categories";
import { CategoryEntity, mapCategoryEntityToModel } from "./entity/category";
import { API } from "./api";

export class CategoriesAPI extends API implements ICategoriesAPI {
    useDefault() {
        return this.fetcher.useData({
            route: { path: "/categories/default" },
            fetcher: async (route, client) => {
                const cats = await client.get<CategoryEntity[]>(route);
                return cats.map(mapCategoryEntityToModel);
            },
        });
    }
}
