import { TopSpendingCategories } from "@/domain/features/stats/components/top-spending-categories";
import { SectionHeader } from "./section-header";

const Dashboard = () => {
    return (
        <>
            <SectionHeader title="Home" description="View statistics, manage transactions and budgets" />
            <TopSpendingCategories title="Top spending categories" limit={5} />
        </>
    );
};

export default Dashboard;
