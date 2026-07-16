"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutAlert } from "@/domain/features/auth/components/log-out-alert";
import { Home, LayoutDashboard, LogOut, Settings } from "lucide-react";
import { useUsersAPI } from "@/domain/api/hooks";
import { paths } from "@/config/paths";

export const UserProfileWithDropdown = () => {
    const usersAPI = useUsersAPI();
    const [user] = usersAPI.useCurrentUser();
    const [open, setOpen] = useState(false);
    const router = useRouter();
    if (!user) return null;

    const onConfirm = () => router.push(paths.home.path);

    return (
        <>
            <LogOutAlert open={open} onOpenChange={setOpen} onConfirm={onConfirm} />
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar className="h-10 w-10 cursor-pointer transition hover:ring-2 hover:ring-primary">
                        <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end" sideOffset={8}>
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium">{user.fullName}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href={paths.home.path} className="flex cursor-pointer items-center">
                                <Home className="mr-2 h-4 w-4" />
                                Home
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={paths.dashboard.path} className="flex cursor-pointer items-center">
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                Dashboard
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <Link href={paths.settings.path} className="flex cursor-pointer items-center">
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="cursor-pointer text-destructive focus:text-destructive"
                        onClick={() => setOpen(true)}
                    >
                        <LogOut className="mr-1 h-4 w-4" />
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
