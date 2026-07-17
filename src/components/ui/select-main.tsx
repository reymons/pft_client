import { SelectRootChangeEventDetails } from "@base-ui/react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";
import { WithLabel } from "./with-label";

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
};

export const MainSelect = <T,>({ items, value, onValueChange, onBlur, ref, name, valueContent, id }: Props<T>) => {
    return (
        <Select value={value} onValueChange={onValueChange} name={name} id={id}>
            <SelectTrigger className="w-full" ref={ref} onBlur={onBlur}>
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
            {({ id }) => <MainSelect id={id} {...rest} />}
        </WithLabel>
    );
};
