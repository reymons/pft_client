"use client";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "./alert-dialog";
import { Loader2 } from "lucide-react";

export type AlertExtProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

type Props = AlertExtProps & {
    onConfirm: () => Promise<void> | void;
    title: string;
    description: string;
    actionText: string;
};

export function Alert({ open, onOpenChange, onConfirm, title, description, actionText }: Props) {
    const [isLoading, setIsLoading] = useState(false);

    const onActionClick = async () => {
        setIsLoading(true);
        await onConfirm();
        setIsLoading(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isLoading}
                        onClick={onActionClick}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {actionText}
                        {isLoading && <Loader2 />}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
