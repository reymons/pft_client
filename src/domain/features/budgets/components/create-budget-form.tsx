import * as yup from "yup";
import { CategoryModel } from "@/domain/models/category";
import { BudgetModel, BudgetPeriod } from "@/domain/models/budget";
import { Form, SubmitHandler } from "@/components/ui/form/form";
import { InputWithLabel, numberInputRegOpts } from "@/components/ui/form/input";
import { Controller } from "@/components/ui/form/controller";
import { SubmitButton } from "@/components/ui/form/submit-button";
import { useBudgetsAPI } from "@/domain/api/hooks";
import { DatePickerWithLabel } from "@/components/ui/form/date-picker";
import { BudgetPeriodSelect } from "./budget-period-select";
import { AddBudgetCategories } from "./add-budget-categories";

const categorySchema = yup
    .mixed<CategoryModel>()
    .test("is-category", "${label} is invalid", (c) => c instanceof CategoryModel);

const schema = yup.object({
    name: yup.string().required().max(50).label("Name"),
    amount: yup.number().required().min(1).max(1_000_000).label("Amount"),
    period: yup.string().oneOf(Object.values(BudgetPeriod)).required().label("Period"),
    startsAt: yup.date().required().label("Starting date"),
    categories: yup.array(categorySchema.required()).required().label("Category"),
});

type FormData = yup.InferType<typeof schema>;

type Props = {
    budget?: BudgetModel;
    submitButtonText?: string;
    isEdit?: boolean;
    onSuccess: () => void;
};

export const CreateBudgetForm = ({ budget, isEdit, onSuccess }: Props) => {
    const budgetsAPI = useBudgetsAPI();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const categories = [...data.categories];
        const newBudget = new BudgetModel(
            budget?.id ?? 0,
            data.name,
            data.amount,
            0,
            data.period,
            data.startsAt,
            categories,
        );
        if (isEdit) {
            await budgetsAPI.edit(newBudget);
        } else {
            await budgetsAPI.save(newBudget);
        }
        onSuccess();
    };

    return (
        <Form
            schema={schema}
            defaultValues={{
                name: budget?.name,
                amount: budget?.amount,
                categories: budget?.categories ?? [],
                period: budget?.period ?? null,
                startsAt: budget?.startsAt ?? new Date(),
            }}
            onSubmit={onSubmit}
        >
            {({ register, formState }) => (
                <>
                    <InputWithLabel
                        reg={register("name")}
                        error={formState.errors.name}
                        label="Name"
                        placeholder="Enter a name"
                    />
                    <InputWithLabel
                        type="number"
                        reg={register("amount", { setValueAs: numberInputRegOpts.setValueAs })}
                        error={formState.errors.amount}
                        label="Amount"
                        placeholder="Enter an amount"
                    />
                    <Controller<FormData, "period">
                        name="period"
                        render={({ field, formState }) => (
                            <BudgetPeriodSelect
                                name={field.name}
                                value={field.value}
                                onValueChange={(v) => field.onChange(v)}
                                onBlur={field.onBlur}
                                ref={field.ref}
                                error={formState.errors.period}
                            />
                        )}
                    />
                    <Controller<FormData, "startsAt">
                        name="startsAt"
                        render={({ field, formState }) => (
                            <DatePickerWithLabel
                                label="Starting date"
                                mode="single"
                                selected={field.value}
                                onSelect={(date) => field.onChange(date)}
                                error={formState.errors.startsAt}
                            />
                        )}
                    />
                    <AddBudgetCategories />
                    <SubmitButton>{isEdit ? "Save" : "Create"}</SubmitButton>
                </>
            )}
        </Form>
    );
};
