import Link from "next/link";
import { paths } from "@/config/paths";
import { UserProfileWithDropdown } from "@/domain/features/user";
import { HeaderBurger } from "./header-burger";

export const Header = () => {
    return (
        <header className="border-b bg-background">
            <div className="flex h-16 items-center px-5">
                <div className="lg:hidden inline-flex">
                    <HeaderBurger />
                </div>
                <Link href={paths.home.path} className="text-xl font-bold tracking-tight ml-5 lg:ml-0">
                    PFT
                </Link>
                <div className="ml-auto">
                    <UserProfileWithDropdown />
                </div>
            </div>
        </header>
    );
};
