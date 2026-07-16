import { CreateBudgetButton } from "@/domain/features/budgets";
import { SectionHeader } from "../section-header";
import { Budgets } from "./budgets";

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
