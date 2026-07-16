import { CategoryModel } from "@/domain/models/category";
import { CategoryBadge } from "./category-badge";

type Props = {
    categories: CategoryModel[];
    withRemove?: boolean;
    onRemove?: (category: CategoryModel) => void;
};

export const CategoryBadges = ({ categories, withRemove, onRemove }: Props) => {
    if (!categories.length) return null;

    return (
        <div className="flex flex-wrap gap-1">
            {categories.map((c) => (
                <CategoryBadge key={c.id} category={c} withRemove={withRemove} onRemove={onRemove} />
            ))}
        </div>
    );
};
