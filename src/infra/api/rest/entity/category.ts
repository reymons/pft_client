import { CategoryModel, categoryName, CategoryType } from "@/domain/models/category";

export type CategoryEntity = {
    id: number;
    type: CategoryType | null;
    customName: string | null;
};

export function mapCategoryEntityToModel(ent: CategoryEntity): CategoryModel {
    return new CategoryModel(
        ent.id,
        ent.type || CategoryType.Default,
        ent.type ? categoryName[ent.type] : ent.customName || "Unknown",
    );
}
