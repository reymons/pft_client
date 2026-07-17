import { SectionHeader } from "../section-header";
import { CreateTransactionButton } from "@/domain/features/transactions/components/create-transaction-button";
import { TransactionsTable } from "@/domain/features/transactions/components/transactions-table";

const TransactionsPage = () => {
    return (
        <>
            <SectionHeader
                title="Transactions"
                description="Manage your transactions"
                beforeEnd={<CreateTransactionButton />}
            />
            <TransactionsTable />
        </>
    );
};

export default TransactionsPage;
