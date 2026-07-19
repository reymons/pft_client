import { TopSpendingCategories } from "@/domain/features/stats/components/top-spending-categories";
import { SectionHeader } from "../section-header";

const CategoriesPage = () => {
    return (
        <>
            <SectionHeader title="Categories" description="Manage categories" />
            <TopSpendingCategories title="Total spending per category" />
        </>
    );
};

export default CategoriesPage;
