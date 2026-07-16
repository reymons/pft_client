import { useRef } from "react";
import type { InferType, ObjectSchema } from "yup";
import type {
    UseFormProps,
    FieldValues,
    SubmitHandler as DefaultSubmitHandler,
    UseFormReturn,
    DefaultValues,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";

export const DEFAULT_ERROR_MESSAGE = "Something went wrong";

export type SubmitHandler<T extends FieldValues> = DefaultSubmitHandler<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Schema = ObjectSchema<any>;

type Props<S extends Schema, T extends FieldValues = InferType<S>> = {
    defaultValues: DefaultValues<{ [K in keyof T]: T[K] | null }>;
    schema: S;
    onSubmit: SubmitHandler<T>;
    children: (form: UseFormReturn<T> & { formRef: React.RefObject<HTMLFormElement | null> }) => React.ReactNode;
    options?: Omit<UseFormProps<T>, "defaultValues" | "resolver">;
};

export const Form = <S extends Schema, T extends FieldValues = InferType<S>>({
    defaultValues,
    schema,
    onSubmit,
    children,
    options,
}: Props<S>) => {
    const formRef = useRef<HTMLFormElement>(null);
    const form = useForm({
        defaultValues,
        resolver: yupResolver(schema),
        ...options,
    });

    const handleSubmit: SubmitHandler<T> = async (data) => {
        try {
            await onSubmit(data);
        } catch (err) {
            form.setError("root", {
                message: err instanceof Error ? err.message : DEFAULT_ERROR_MESSAGE,
            });
        }
    };

    return (
        <FormProvider {...form}>
            <form className="space-y-5 pt-4" onSubmit={form.handleSubmit(handleSubmit)} ref={formRef}>
                {children({ ...form, formRef })}
            </form>
        </FormProvider>
    );
};
