import { useId } from "react";
import { Label } from "./label";
import { cn } from "@/lib/utils";

type Props = {
    label: string;
    invalid: boolean;
    children: (data: { id: string }) => React.ReactNode;
};

export const WithLabel = ({ label, invalid, children }: Props) => {
    const id = useId();

    return (
        <div className="space-y-2">
            <Label className={cn(invalid && "text-destructive")} htmlFor={id}>
                {label}
            </Label>
            {children({ id })}
        </div>
    );
};
