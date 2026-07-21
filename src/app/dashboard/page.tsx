import { TopSpendingCategories } from "@/domain/features/stats/components/top-spending-categories";
import { Summary } from "@/domain/features/stats/components/summary";
import { SectionHeader } from "./section-header";

const Dashboard = () => {
    return (
        <>
            <SectionHeader title="Home" description="View statistics, manage transactions and budgets" />
            <div className="flex flex-col gap-4 lg:gap-6">
                <Summary />
                <TopSpendingCategories title="Top spending categories" limit={5} />
            </div>
        </>
    );
};

export default Dashboard;
