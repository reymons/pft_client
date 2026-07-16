import { SelectWithLabel, SelectWithLabelProps, SelectItem } from "@/components/ui/form/select";
import { BudgetPeriod, budgetPeriod } from "@/domain/models/budget";

const items = Object.entries(budgetPeriod).map<SelectItem<BudgetPeriod>>(([period, text], i) => ({
    id: i,
    value: period as BudgetPeriod,
    content: text,
}));

type Props = Omit<SelectWithLabelProps<BudgetPeriod>, "label" | "items" | "valueContent">;

export const BudgetPeriodSelect = ({ value, ...rest }: Props) => {
    return (
        <SelectWithLabel
            label="Period"
            items={items}
            value={value}
            valueContent={value ? budgetPeriod[value] : "Select a period"}
            {...rest}
        />
    );
};
