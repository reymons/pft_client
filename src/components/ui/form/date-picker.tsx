import { FieldError } from "react-hook-form";
import { DatePicker as DefaultDatePicker } from "../date-picker";
import { WithLabel } from "../with-label";

type Props = React.ComponentProps<typeof DefaultDatePicker> & {
    label: string;
    error: FieldError | undefined;
};

export const DatePickerWithLabel = ({ error, label, ...rest }: Props) => {
    const hasError = !!error;

    return (
        <WithLabel label={hasError ? (error.message ?? "Unknown error") : label} invalid={hasError}>
            {({ id }) => <DefaultDatePicker {...rest} invalid={hasError} id={id} />}
        </WithLabel>
    );
};
