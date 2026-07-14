"use client";
import { SignInForm } from "./sign-in-form";
import { useState } from "react";
import { SignUpForm } from "./sign-up-form";
import { MainDialog, MainDialogExtProps } from "@/components/ui/dialog-main";

type Props = MainDialogExtProps & {
    isSignIn?: boolean;
    onSuccess(isSignIn: boolean): void;
};

export const AuthDialog = ({ isSignIn: signIn = false, onSuccess, open, onOpenChange }: Props) => {
    const [isSignIn, setIsSignIn] = useState(signIn);

    return (
        <MainDialog
            open={open}
            onOpenChange={onOpenChange}
            title={isSignIn ? "Welcome back" : "Create an account"}
            description={`${isSignIn ? "Sign in" : "Sign up"} to continue managing your finances`}
            contentClassName="sm:max-w-[425px]"
        >
            {isSignIn ? (
                <SignInForm onSignUp={() => setIsSignIn(false)} onSuccess={() => onSuccess(false)} />
            ) : (
                <SignUpForm onSignIn={() => setIsSignIn(true)} onSuccess={() => onSuccess(true)} />
            )}
        </MainDialog>
    );
};
