import { SelectWithLabel, SelectWithLabelProps, SelectItem } from "@/components/ui/form/select";
import { TrxRecurringPeriod, trxRecurringPeriodName } from "@/domain/models/transaction";

const items = Object.entries(trxRecurringPeriodName).map<SelectItem<TrxRecurringPeriod>>(([period, text], i) => ({
    id: i,
    value: period as TrxRecurringPeriod,
    content: text,
}));

type Props = Omit<SelectWithLabelProps<TrxRecurringPeriod>, "label" | "items" | "valueContent">;

export const TrxRecurringPeriodSelect = ({ value, onValueChange, ...rest }: Props) => {
    return (
        <SelectWithLabel
            label="Period of recurrence"
            items={items}
            value={value}
            valueContent={value ? trxRecurringPeriodName[value] : "Select a period"}
            {...rest}
            onValueChange={(period, e) => {
                if (period === value) onValueChange(null, e);
                else onValueChange(period, e);
            }}
        />
    );
};
