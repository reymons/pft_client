import { MainDialog, MainDialogExtProps } from "@/components/ui/dialog-main";
import { CreateTransactionForm } from "./create-transaction-form";

type Props = MainDialogExtProps & {
    onSuccess: () => void;
    isEdit?: boolean;
};

export const CreateTransactionFormDialog = ({ onSuccess, isEdit, ...rest }: Props) => {
    return (
        <MainDialog
            title={isEdit ? "Edit transaction" : "Create transaction"}
            description="Manage your transaction"
            {...rest}
        >
            <CreateTransactionForm isEdit={isEdit} onSuccess={onSuccess} />
        </MainDialog>
    );
};
