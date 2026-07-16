import { FieldError, RegisterOptions, UseFormRegisterReturn } from "react-hook-form";
import { WithLabel } from "../with-label";
import { Input } from "../input";

type InputWithLabelProps = React.ComponentProps<typeof Input> & {
    label: string;
    reg: UseFormRegisterReturn;
    error: FieldError | undefined;
};

// eslint-disable-next-line
export const numberInputRegOpts: RegisterOptions<any, any> = {
    setValueAs: (v) => (v === "" ? undefined : Number(v)),
};

export const InputWithLabel = ({ reg, error, label: defaultLabel, ...rest }: InputWithLabelProps) => {
    const hasError = !!error;

    return (
        <WithLabel label={hasError ? error.message || "Unknown error" : defaultLabel} invalid={hasError}>
            {({ id }) => <Input {...reg} id={id} invalid={hasError} {...rest} />}
        </WithLabel>
    );
};
