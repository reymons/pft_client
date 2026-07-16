"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUsersAPI } from "@/domain/api/hooks";
import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { AuthDialog } from "@/domain/features/auth/components/auth-dialog";
import { UserProfileWithDropdown } from "./user-profile-with-dropdown";

export const UserProfileOrSignIn = () => {
    const [open, setOpen] = useState(false);
    const usersAPI = useUsersAPI();
    const [user, userState] = usersAPI.useCurrentUser();
    const router = useRouter();

    if (userState.isLoading) return <></>;

    const onSuccess = () => {
        router.push(paths.dashboard.path);
        setOpen(false);
    };

    return user ? (
        <UserProfileWithDropdown />
    ) : (
        <div>
            <AuthDialog isSignIn onSuccess={onSuccess} open={open} onOpenChange={setOpen} />
            <Button className="cursor-pointer" onClick={() => setOpen(true)}>
                Sign in
            </Button>
        </div>
    );
};
