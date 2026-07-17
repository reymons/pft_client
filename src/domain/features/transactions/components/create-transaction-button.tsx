"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreateTransactionFormDialog } from "./create-transaction-form-dialog";

export const CreateTransactionButton = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <CreateTransactionFormDialog open={open} onOpenChange={setOpen} onSuccess={() => setOpen(false)} />
            <Button onClick={() => setOpen(true)}>Add transaction</Button>
        </>
    );
};
