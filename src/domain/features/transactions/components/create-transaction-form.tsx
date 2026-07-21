import * as yup from "yup";
import { TransactionModel, TransactionType, TrxRecurringPeriod } from "@/domain/models/transaction";
import { CategoryModel } from "@/domain/models/category";
import { Form, SubmitHandler } from "@/components/ui/form/form";
import { InputWithLabel } from "@/components/ui/form/input";
import { Controller } from "@/components/ui/form/controller";
import { AddTransactionCategory } from "./add-transaction-category";
import { SubmitButton } from "@/components/ui/form/submit-button";
import { useTransactionsAPI } from "@/domain/api/hooks";
import { TrxRecurringPeriodSelect } from "./transaction-recurring-period-select";
import { SelectTransactionType } from "./select-transaction-type";
import { DatePickerWithLabel } from "@/components/ui/form/date-picker";

const schema = yup.object({
    type: yup.mixed<TransactionType>().oneOf(Object.values(TransactionType)).required().label("Type"),
    name: yup.string().required().label("Name"),
    description: yup.string().label("Description"),
    category: yup
        .mixed<CategoryModel>()
        .test("is-category", "Invalid category", (c) => c instanceof CategoryModel)
        .required()
        .label("Category"),
    amount: yup.number().positive().required().label("Amount"),
    addedAt: yup.date().required().label("Date"),
    recurringPeriod: yup
        .mixed<TrxRecurringPeriod>()
        .notRequired()
        .oneOf(Object.values(TrxRecurringPeriod))
        .label("Period"),
});

type FormData = yup.InferType<typeof schema>;

type Props = {
    transaction?: TransactionModel;
    onSuccess: () => void;
    isEdit?: boolean;
};

export const CreateTransactionForm = ({ transaction, isEdit, onSuccess }: Props) => {
    const trxAPI = useTransactionsAPI();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (isEdit) {
        } else {
            const trx = new TransactionModel(
                0,
                data.type,
                data.name,
                data.description ?? "",
                data.amount,
                data.addedAt,
                data.recurringPeriod ?? null,
                data.category,
            );
            await trxAPI.save(trx);
        }
        onSuccess();
    };

    return (
        <Form
            schema={schema}
            defaultValues={{
                type: transaction?.type ?? null,
                amount: transaction?.amount,
                category: transaction?.category ?? null,
                name: transaction?.name ?? "",
                description: transaction?.description ?? "",
                recurringPeriod: transaction?.recurringPeriod ?? null,
                addedAt: transaction?.addedAt ?? new Date(),
            }}
            onSubmit={onSubmit}
        >
            {({ register, formState }) => (
                <>
                    <InputWithLabel
                        reg={register("name")}
                        placeholder="Enter a name"
                        error={formState.errors.name}
                        label="Name"
                    />
                    <InputWithLabel
                        reg={register("description")}
                        placeholder="Enter a description"
                        error={formState.errors.description}
                        label="Description"
                    />
                    <InputWithLabel
                        reg={register("amount", {
                            setValueAs: (v) => (v === "" ? undefined : Number(v)),
                        })}
                        placeholder="Enter an amount"
                        error={formState.errors.amount}
                        label="Amount"
                    />
                    <Controller<FormData, "type">
                        name="type"
                        render={({ field, formState }) => (
                            <SelectTransactionType
                                name={field.name}
                                value={field.value}
                                onValueChange={(v) => field.onChange(v)}
                                onBlur={field.onBlur}
                                ref={field.ref}
                                error={formState.errors.type}
                            />
                        )}
                    />
                    <Controller<FormData, "addedAt">
                        name="addedAt"
                        render={({ field, formState }) => (
                            <DatePickerWithLabel
                                label="Date"
                                error={formState.errors.addedAt}
                                mode="single"
                                selected={field.value}
                                onSelect={(d) => field.onChange(d)}
                            />
                        )}
                    />
                    <Controller<FormData, "recurringPeriod">
                        name="recurringPeriod"
                        render={({ field, formState }) => (
                            <TrxRecurringPeriodSelect
                                name={field.name}
                                value={field.value}
                                onValueChange={(v) => field.onChange(v)}
                                onBlur={field.onBlur}
                                ref={field.ref}
                                error={formState.errors.recurringPeriod}
                            />
                        )}
                    />
                    <AddTransactionCategory />
                    <SubmitButton>{isEdit ? "Save" : "Create"}</SubmitButton>
                </>
            )}
        </Form>
    );
};
