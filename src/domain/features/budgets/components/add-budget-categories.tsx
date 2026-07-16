import { useCategoriesAPI } from "@/domain/api/hooks";
import { CategoryModel } from "@/domain/models/category";
import { CategoryBadges } from "@/domain/features/categories/components/category-badges";
import { AddCategoryPopover } from "@/domain/features/categories/components/add-category-popover";
import { useController } from "@/components/ui/form/controller";
import { Label } from "@/components/ui/label";

type FormData = {
    categories: CategoryModel[];
};

export const AddBudgetCategories = () => {
    const categoriesAPI = useCategoriesAPI();
    const [categories] = categoriesAPI.useDefault();
    const { field } = useController<FormData, "categories">({ name: "categories" });
    if (!categories) return null;

    const removeCategory = (category: CategoryModel) => {
        const newCategories = field.value.filter((c) => c.id !== category.id);
        field.onChange(newCategories);
    };

    const selectCategory = (category: CategoryModel) => {
        field.onChange([...field.value, category]);
    };

    return (
        <div className="space-y-3">
            <Label>Categories</Label>
            <CategoryBadges categories={field.value} withRemove onRemove={removeCategory} />
            <div className="flex gap-1">
                <AddCategoryPopover
                    categories={categories}
                    selectedCategories={field.value}
                    onSelect={selectCategory}
                />
            </div>
        </div>
    );
};
