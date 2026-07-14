import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { InputWithLabel as DefaultInputWithLabel } from "../input";

type InputWithLabelProps = React.ComponentProps<typeof DefaultInputWithLabel> & {
    reg: UseFormRegisterReturn;
    error: FieldError | undefined;
};

export const InputWithLabel = ({ reg, error, label: defaultLabel, ...rest }: InputWithLabelProps) => {
    const hasError = !!error;

    return (
        <DefaultInputWithLabel
            {...rest}
            {...reg}
            label={hasError ? error.message || "Unknown error" : defaultLabel}
            invalid={hasError}
        />
    );
};
