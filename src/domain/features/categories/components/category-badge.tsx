import { Badge } from "@/components/ui/badge";
import { CategoryModel } from "@/domain/models/category";
import { X } from "lucide-react";

type Props = {
    category: CategoryModel;
    withRemove?: boolean;
    onRemove?: (category: CategoryModel) => void;
};

export const CategoryBadge = ({ category, withRemove, onRemove }: Props) => {
    return (
        <Badge className="gap-1" variant="secondary">
            {category.name}
            <button type="button" onClick={() => onRemove?.(category)}>
                {withRemove && <X className="w-3 h-3" />}
            </button>
        </Badge>
    );
};
