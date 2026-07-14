import Link from "next/link";
import { Profile } from "./profile";
import { paths } from "@/config/paths";

export const Header = () => {
    return (
        <header className="border-b bg-background">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href={paths.home.path} className="text-xl font-bold tracking-tight">
                    PFT
                </Link>
                <Profile />
            </div>
        </header>
    );
};

//<nav className="flex items-center gap-6">
//    <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
//        Dashboard
//    </Link>
//    <Link href="/transactions" className="text-sm font-medium hover:text-primary">
//        Transactions
//    </Link>
//    <Link href="/budgets" className="text-sm font-medium hover:text-primary">
//        Budgets
//    </Link>
//</nav>
