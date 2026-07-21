"use client";
import Link from "next/link";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useStatsAPI } from "@/domain/api/hooks";
import { cn } from "@/lib/utils";
import { paths } from "@/config/paths";
import { SummaryCard, SummaryCardSkeleton } from "./summary-card";

export const Summary = () => {
    const statsAPI = useStatsAPI();
    const [summary, { isLoading }] = statsAPI.useSummary();

    if (isLoading) return <Skeleton />;
    if (!summary) return null;

    const trxRatio = +(
        ((summary.transactionsThisMonth - summary.transactionsPrevMonth) / (summary.transactionsPrevMonth || 1)) *
        100
    ).toFixed(2);

    const spendingRatio = +(
        ((summary.spendingThisMonth - summary.spendingPrevMonth) / (summary.spendingPrevMonth || 1)) *
        100
    ).toFixed(2);

    return (
        <div className="flex flex-wrap gap-4 lg:gap-6">
            <SummaryCard header="Balance">
                <span
                    className={cn(summary.balance < 0 && "text-destructive", summary.balance > 0 && "text-green-400")}
                >
                    ${summary.balance}
                </span>
            </SummaryCard>
            <Link href={paths.budgets.path}>
                <SummaryCard header="Active budgets">{summary.budgets}</SummaryCard>
            </Link>
            <Link href={paths.transactions.path}>
                <SummaryCard header="Transactions">
                    <div className="flex justify-between align-center">
                        {summary.transactions}
                        {trxRatio !== 0 && summary.transactionsPrevMonth !== 0 && (
                            <div
                                className={cn(
                                    "flex align-center",
                                    trxRatio > 0 ? "text-green-400" : "text-destructive",
                                )}
                            >
                                {trxRatio > 0 ? <ArrowUp /> : <ArrowDown />}
                                {trxRatio}%
                            </div>
                        )}
                    </div>
                </SummaryCard>
            </Link>
            <SummaryCard header="Spending this month">
                <div className="flex justify-between align-center">
                    ${summary.spendingThisMonth}
                    {spendingRatio !== 0 && summary.spendingPrevMonth !== 0 && (
                        <div
                            className={cn(
                                "flex align-center",
                                spendingRatio < 0 ? "text-green-400" : "text-destructive",
                            )}
                        >
                            {spendingRatio > 0 ? <ArrowUp /> : <ArrowDown />}
                            {spendingRatio}%
                        </div>
                    )}
                </div>
            </SummaryCard>
        </div>
    );
};

const Skeleton = () => {
    return (
        <div className="flex flex-wrap gap-4 lg:gap-6">
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
        </div>
    );
};
