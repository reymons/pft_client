import { useCategoriesAPI } from "@/domain/api/hooks";
import { CategoryModel } from "@/domain/models/category";
import { useController } from "@/components/ui/form/controller";
import { AddCategoryPopover } from "@/domain/features/categories/components/add-category-popover";
import { CategoryBadge } from "@/domain/features/categories/components/category-badge";
import { WithLabel } from "@/components/ui/with-label";

type FormData = {
    category: CategoryModel | null;
};

export const AddTransactionCategory = () => {
    const categoriesAPI = useCategoriesAPI();
    const [categories] = categoriesAPI.useDefault();
    const { field, formState } = useController<FormData, "category">({ name: "category" });
    if (!categories) return null;

    const category = field.value;
    const hasError = !!formState.errors.category;
    const removeCategory = () => field.onChange(null);

    return (
        <div className="space-y-3">
            <WithLabel label={hasError ? formState.errors.category?.message || "" : "Category"} invalid={hasError}>
                {({ id }) => (
                    <>
                        {!!category && <CategoryBadge category={category} withRemove onRemove={removeCategory} />}
                        <div className="flex gap-1" id={id}>
                            <AddCategoryPopover
                                categories={categories}
                                selectedCategories={category ? [category] : []}
                                onSelect={(c) => field.onChange(c)}
                            />
                        </div>
                    </>
                )}
            </WithLabel>
        </div>
    );
};
