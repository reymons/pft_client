import { FieldError } from "react-hook-form";
import { Item, MainSelectWithLabel, MainSelectWithLabelProps } from "../select-main";

export type SelectItem<T> = Item<T>;

export type SelectWithLabelProps<T> = Omit<MainSelectWithLabelProps<T>, "invalid"> & {
    error: FieldError | undefined;
};

export const SelectWithLabel = <T,>({ error, label: defaultLabel, ...rest }: SelectWithLabelProps<T>) => {
    const hasError = !!error;

    return (
        <MainSelectWithLabel
            label={hasError ? error.message || "Unknown error" : defaultLabel}
            invalid={hasError}
            {...rest}
        />
    );
};
