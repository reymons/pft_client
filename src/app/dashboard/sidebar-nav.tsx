"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CreditCard, PiggyBank, Settings, ChevronRight, Tags } from "lucide-react";
import { cn } from "@/lib/utils";
import { paths } from "@/config/paths";
import { useStatsAPI } from "@/domain/api/hooks";

const items = [
    {
        title: "Dashboard",
        href: paths.dashboard.path,
        icon: LayoutDashboard,
    },
    {
        title: "Transactions",
        href: paths.transactions.path,
        icon: CreditCard,
    },
    {
        title: "Budgets",
        href: paths.budgets.path,
        icon: PiggyBank,
    },
    {
        title: "Categories",
        href: paths.categories.path,
        icon: Tags,
    },
    {
        title: "Settings",
        href: paths.settings.path,
        icon: Settings,
    },
];

type Props = {
    onNavigate?(): void;
};

export const SidebarNav = ({ onNavigate }: Props) => {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 px-3 py-5">
                <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Navigation
                </p>
                <nav className="space-y-1">
                    {items.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                                    active
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                )}
                                onClick={onNavigate}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className="h-4 w-4 shrink-0" />
                                    <span className="font-medium">{item.title}</span>
                                </div>
                                <ChevronRight
                                    className={cn(
                                        "h-3.5 w-3.5 transition-all",
                                        active ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                                    )}
                                />
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <Footer />
        </div>
    );
};

const Footer = () => {
    const statsAPI = useStatsAPI();
    const [summary] = statsAPI.useSummary();
    if (!summary) return null;

    return (
        <div className="border-t p-4">
            <div className="rounded-lg bg-muted p-4">
                <p className="text-xs font-medium text-muted-foreground">This Month</p>
                <p className="mt-1 text-xl font-bold">${summary.spendingThisMonth}</p>
                <p className="text-xs text-muted-foreground">Total spending</p>
            </div>
        </div>
    );
};
