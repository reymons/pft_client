import { cn } from "@/lib/utils";
import { Button } from "../button";
import { useFormContext } from "react-hook-form";

export const SubmitButton = ({ className, size = "lg", ...rest }: React.ComponentProps<typeof Button>) => {
    const { formState } = useFormContext();
    const { isSubmitting, isSubmitSuccessful } = formState;

    return (
        <Button
            {...rest}
            className={cn(className, "w-full")}
            size={size}
            isLoading={isSubmitting}
            disabled={isSubmitSuccessful}
            type="submit"
        />
    );
};
