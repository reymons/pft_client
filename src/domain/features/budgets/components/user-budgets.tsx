"use client";
import { useBudgetsAPI, useUsersAPI } from "@/domain/api/hooks";

export const UserBudgets = () => {
    const usersAPI = useUsersAPI();
    const budgetsAPI = useBudgetsAPI();

    const [user, userState] = usersAPI.useCurrentUser();
    const [budgets, budgetsState] = budgetsAPI.useCurrentBudgets();

    if (budgetsState.isLoading || userState.isLoading) return <p>Loading...</p>;
    if (!budgets || !user) return <></>;

    return (
        <>
            <div>
                <p>{user.id}</p>
                <p>{user.name}</p>
                <p>{user.createdAt.toISOString()}</p>
            </div>
            <ul>
                {budgets.map((b) => (
                    <li key={b.id}>
                        <span>${b.amount}</span> <span>{b.period}</span>
                    </li>
                ))}
            </ul>
        </>
    );
};
