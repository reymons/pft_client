import Link from "next/link";
import { paths } from "@/config/paths";
import { UserProfileOrSignIn } from "@/domain/features/user";

export const Header = () => {
    return (
        <header className="border-b bg-background sticky top-0">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href={paths.home.path} className="text-xl font-bold tracking-tight">
                    PFT
                </Link>
                <UserProfileOrSignIn />
            </div>
        </header>
    );
};
