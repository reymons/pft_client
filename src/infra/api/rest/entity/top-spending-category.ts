import { TopSpendingCategoryModel } from "@/domain/models/top-spending-category";
import { CategoryEntity, mapCategoryEntityToModel } from "./category";

export type TopSpendingCategoryEntity = {
    category: CategoryEntity;
    amount: number;
};

export function mapTopSpendingCategoryEntityToModel(ent: TopSpendingCategoryEntity) {
    return new TopSpendingCategoryModel(mapCategoryEntityToModel(ent.category), ent.amount);
}
