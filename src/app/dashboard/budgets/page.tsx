import { CreateBudgetButton } from "@/domain/features/budgets";
import { Budgets } from "@/domain/features/budgets/components/budgets";
import { SectionHeader } from "../section-header";

const BudgetsPage = () => {
    return (
        <>
            <SectionHeader
                title="Budgets"
                description="Manage your spending limits"
                beforeEnd={<CreateBudgetButton />}
            />
            <Budgets />
        </>
    );
};

export default BudgetsPage;
