"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { AuthDialog } from "@/domain/features/auth/components/auth-dialog";
import { useRouter } from "next/navigation";
import { paths } from "@/config/paths";

export const GetStartedButton = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const onSuccess = () => {
        router.push(paths.dashboard.path);
        setOpen(false);
    };

    return (
        <>
            <AuthDialog open={open} onOpenChange={setOpen} onSuccess={onSuccess} />
            <Button className="flex items-center cursor-pointer" size="lg" onClick={() => setOpen(true)}>
                Get Started
                <ArrowRight className="h-4 w-4" />
            </Button>
        </>
    );
};
