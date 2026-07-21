import { Repeat } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BudgetModel } from "@/domain/models/budget";
import { BudgetControls } from "./budget-controls";
import { CategoryBadges } from "../../categories/components/category-badges";
import { CategoryBadge } from "../../categories/components/category-badge";
import { CategoryModel, CategoryType } from "@/domain/models/category";
import { CardSkeleton } from "@/components/ui/skeletons/card-skeleton";

type Props = {
    budget: BudgetModel;
};

const globalCategory = new CategoryModel(0, CategoryType.Default, "Global");

export const BudgetCard = ({ budget }: Props) => {
    const percentage = Math.round((budget.totalSpent / budget.amount) * 100);

    return (
        <Card>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                <div>
                    <h3 className="font-semibold">{budget.name}</h3>
                    <Badge variant="secondary" className="mt-2 gap-1 text-xs">
                        <Repeat className="h-3 w-3" />
                        {budget.label}
                    </Badge>
                </div>
                <BudgetControls budget={budget} />
            </CardHeader>
            <CardContent>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Spent</span>
                    <span className="font-medium">
                        ${budget.totalSpent} / ${budget.amount}
                    </span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-muted">
                    <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{percentage}% used</p>
            </CardContent>
            <CardFooter className="flex-1">
                {!budget.categories.length && <CategoryBadge category={globalCategory} />}
                <CategoryBadges categories={budget.categories} />
            </CardFooter>
        </Card>
    );
};

export const BudgetCardSkeleton = () => {
    return <CardSkeleton className="h-[226px]" />;
};
