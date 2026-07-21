"use client";
import { useState } from "react";
import { useStatsAPI } from "@/domain/api/hooks";
import { TopSpendingCategoryPeriod, topSpendingCategoryPeriodName } from "@/domain/models/top-spending-category";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item, MainSelect } from "@/components/ui/select-main";
import { CardSkeleton } from "@/components/ui/skeletons/card-skeleton";

const items: Item<TopSpendingCategoryPeriod>[] = Object.entries(topSpendingCategoryPeriodName).map(
    ([period, text]) => ({
        id: period,
        value: period as TopSpendingCategoryPeriod,
        content: text,
    }),
);

type Props = {
    title: string;
    limit?: number;
};

export const TopSpendingCategories = ({ title, limit }: Props) => {
    const [period, setPeriod] = useState(TopSpendingCategoryPeriod.Monthly);
    const statsAPI = useStatsAPI();
    const [cats, { isValidating }] = statsAPI.useTopSpendingCategories({ period, limit });

    if (!cats && isValidating) return <CardSkeleton className="w-full h-[228px]" />;

    const categories = cats ?? [];
    const max = Math.max(...categories.map((c) => c.amount), 1);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{title}</CardTitle>
                <div className="w-[150px]">
                    <MainSelect
                        items={items}
                        value={period}
                        valueContent={topSpendingCategoryPeriodName[period]}
                        onValueChange={(p) => setPeriod(p ?? TopSpendingCategoryPeriod.Monthly)}
                    />
                </div>
            </CardHeader>
            <CardContent className="space-y-5">
                {categories.map((c) => (
                    <div key={c.category.id} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{c.category.name}</span>
                            <span className="text-muted-foreground">${c.amount}</span>
                        </div>
                        <Progress value={(c.amount / max) * 100} className="h-2" />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};
