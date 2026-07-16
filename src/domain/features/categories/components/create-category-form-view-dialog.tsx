import { MainDialog, MainDialogExtProps } from "@/components/ui/dialog-main";
import { CreateCategoryFormView } from "./create-category-form-view";

type Props = MainDialogExtProps & React.ComponentProps<typeof CreateCategoryFormView>;

export const CreateCategoryFormViewDialog = ({ open, onOpenChange, isEdit, ...rest }: Props) => {
    return (
        <MainDialog
            title={isEdit ? "Edit category" : "Create category"}
            description="Here you can manage your category"
            open={open}
            onOpenChange={onOpenChange}
        >
            <CreateCategoryFormView {...rest} isEdit={isEdit} />
        </MainDialog>
    );
};
