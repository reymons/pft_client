"use client";
import { Alert, AlertExtProps } from "@/components/ui/alert";
import { useBudgetsAPI } from "@/domain/api/hooks";

type Props = AlertExtProps & {
    budgetId: number;
};

export const DeleteBudgetAlert = ({ budgetId, onOpenChange, ...rest }: Props) => {
    const budgetsAPI = useBudgetsAPI();

    return (
        <Alert
            {...rest}
            onOpenChange={onOpenChange}
            title="Delete budget"
            description="Are you sure you want to delete this budget?"
            onConfirm={async () => {
                await budgetsAPI.deleteById(budgetId);
                onOpenChange(false);
            }}
            actionText="Delete"
        />
    );
};
