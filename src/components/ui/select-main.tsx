import { SelectRootChangeEventDetails } from "@base-ui/react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";
import { WithLabel } from "./with-label";
import { cn } from "@/lib/utils";

export type ValueChangeHandler<T> = (v: T | null, e: SelectRootChangeEventDetails) => void;

export type Item<T> = {
    id: React.Key;
    content: React.ReactNode;
    value: T;
};

export type MainSelectExtProps<T> = Pick<Props<T>, "name" | "onBlur" | "ref" | "value" | "onValueChange">;

type Props<T> = {
    items: Item<T>[];
    value: T | undefined | null;
    onValueChange: ValueChangeHandler<T>;
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
    ref?: React.Ref<HTMLButtonElement>;
    name?: string;
    valueContent: React.ReactNode;
    id?: string;
    invalid?: boolean;
};

export const MainSelect = <T,>({
    items,
    value,
    onValueChange,
    onBlur,
    ref,
    name,
    valueContent,
    id,
    invalid,
}: Props<T>) => {
    return (
        <Select value={value} onValueChange={onValueChange} name={name} id={id}>
            <SelectTrigger
                className={cn("w-full", invalid && "border-destructive ring-destructive/20")}
                aria-invalid={invalid}
                ref={ref}
                onBlur={onBlur}
            >
                {valueContent}
            </SelectTrigger>
            <SelectContent>
                {items.map((item) => (
                    <SelectItem key={item.id} value={item.value}>
                        {item.content}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export type MainSelectWithLabelProps<T> = Props<T> & {
    label: string;
    invalid: boolean;
};

export const MainSelectWithLabel = <T,>({ label, invalid, ...rest }: MainSelectWithLabelProps<T>) => {
    return (
        <WithLabel label={label} invalid={invalid}>
            {({ id }) => <MainSelect id={id} invalid={invalid} {...rest} />}
        </WithLabel>
    );
};
