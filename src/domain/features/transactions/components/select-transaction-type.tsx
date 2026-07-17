import { SelectWithLabel, SelectWithLabelProps, SelectItem } from "@/components/ui/form/select";
import { MainSelect, MainSelectExtProps } from "@/components/ui/select-main";
import { transactionName, TransactionType } from "@/domain/models/transaction";

const items = Object.entries(transactionName).map<SelectItem<TransactionType>>(([period, text], i) => ({
    id: i,
    value: period as TransactionType,
    content: text,
}));

type Props = Omit<SelectWithLabelProps<TransactionType>, "label" | "items" | "valueContent">;

export const SelectTransactionTypeRaw = (props: MainSelectExtProps<TransactionType>) => {
    return (
        <MainSelect
            {...props}
            items={items}
            valueContent={props.value ? transactionName[props.value] : "Select a type"}
        />
    );
};

export const SelectTransactionType = ({ value, ...rest }: Props) => {
    return (
        <SelectWithLabel
            label="Type"
            items={items}
            value={value}
            valueContent={value ? transactionName[value] : "Select a type"}
            {...rest}
        />
    );
};
