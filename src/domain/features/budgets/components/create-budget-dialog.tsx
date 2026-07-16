import { MainDialog, MainDialogExtProps } from "@/components/ui/dialog-main";
import { BudgetModel } from "@/domain/models/budget";
import { CreateBudgetForm } from "./create-budget-form";

type Props = MainDialogExtProps & {
    budget?: BudgetModel;
    isEdit?: boolean;
    onSuccess: () => void;
};

export const CreateBudgetDialog = ({ budget, isEdit = false, onSuccess, ...rest }: Props) => {
    return (
        <MainDialog
            {...rest}
            title={isEdit ? "Edit budget" : "Create budget"}
            description="Here you can manage your budget"
            contentClassName="sm:max-w-[425px]"
        >
            <CreateBudgetForm budget={budget} isEdit={isEdit} onSuccess={onSuccess} />
        </MainDialog>
    );
};
