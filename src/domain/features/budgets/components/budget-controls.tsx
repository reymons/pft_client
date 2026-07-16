"use client";
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BudgetModel } from "@/domain/models/budget";
import { DeleteBudgetAlert } from "./delete-budget-alert";
import { CreateBudgetDialog } from "./create-budget-dialog";

type Props = {
    budget: BudgetModel;
};

export const BudgetControls = ({ budget }: Props) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditting, setIsEditting] = useState(false);

    return (
        <>
            <CreateBudgetDialog
                isEdit
                open={isEditting}
                onOpenChange={setIsEditting}
                budget={budget}
                onSuccess={() => setIsEditting(false)}
            />
            <DeleteBudgetAlert open={isDeleting} onOpenChange={setIsDeleting} budgetId={budget.id} />
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreHorizontal className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setIsEditting(true)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={() => setIsDeleting(true)}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
