"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreateBudgetDialog } from "./create-budget-dialog";

export const CreateBudgetButton = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <CreateBudgetDialog open={open} onOpenChange={setOpen} onSuccess={() => setOpen(false)} />
            <Button onClick={() => setOpen(true)}>Create budget</Button>
        </>
    );
};
