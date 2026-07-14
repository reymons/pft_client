import { cn } from "@/lib/utils";
import { DialogExtProps as DEP, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog";

export type MainDialogExtProps = DEP;

type Props = MainDialogExtProps & {
    contentClassName?: string;
    title: string;
    description: string;
    children: React.ReactNode;
};

export const MainDialog = ({ open, onOpenChange, title, description, children, contentClassName }: Props) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={cn("p-6", contentClassName)}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
};
