import * as yup from "yup";
import { CategoryModel } from "@/domain/models/category";
import { BudgetModel, BudgetPeriod } from "@/domain/models/budget";
import { Form, SubmitHandler } from "@/components/ui/form/form";
import { InputWithLabel, numberInputRegOpts } from "@/components/ui/form/input";
import { Controller } from "@/components/ui/form/controller";
import { SubmitButton } from "@/components/ui/form/submit-button";
import { BudgetPeriodSelect } from "./budget-period-select";
import { AddBudgetCategories } from "./add-budget-categories";
import { useBudgetsAPI } from "@/domain/api/hooks";

type NewCategory = {
    id: string;
    category: CategoryModel;
};

const categorySchema = yup
    .mixed<CategoryModel>()
    .test("is-category", "Invalid category", (c) => c instanceof CategoryModel);

const newCategorySchema = yup
    .mixed<NewCategory>()
    .test(
        "is-new-category",
        "Invalid category",
        (c) => c && c.category instanceof CategoryModel && typeof c.id === "string",
    );

const schema = yup.object({
    name: yup.string().required().max(50).label("Name"),
    amount: yup.number().required().min(1).max(1_000_000).label("Amount"),
    period: yup.string().oneOf(Object.values(BudgetPeriod)).required().label("Period"),
    categories: yup.array(categorySchema).required().label("Categories"),
    newCategories: yup.array(newCategorySchema).required().label("New categories"),
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
        const budget = new BudgetModel(0, data.name, data.amount, data.period, [...data.categories]);
        if (isEdit) {
        } else {
            await budgetsAPI.save(budget, data.newCategories);
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
                newCategories: [],
                period: budget?.period ?? null,
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
                    <AddBudgetCategories />
                    <SubmitButton>{isEdit ? "Save" : "Create"}</SubmitButton>
                </>
            )}
        </Form>
    );
};
