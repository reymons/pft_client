"use client";
import { Alert, AlertExtProps } from "@/components/ui/alert";
import { useBudgetsAPI } from "@/domain/api/hooks";

type Props = AlertExtProps & {
    budgetId: number;
};

export const DeleteBudgetAlert = ({ budgetId, ...rest }: Props) => {
    const budgetsAPI = useBudgetsAPI();

    return (
        <Alert
            {...rest}
            title="Delete budget"
            description="Are you sure you want to delete this budget?"
            onConfirm={() => budgetsAPI.deleteById(budgetId)}
            actionText="Delete"
        />
    );
};
