"use client";
import * as yup from "yup";
import { useAuthAPI } from "@/domain/api/hooks";
import { Form, type SubmitHandler } from "@/components/ui/form/form";
import { SubmitButton } from "@/components/ui/form/submit-button";
import { InputWithLabel } from "@/components/ui/form/input";

type Props = {
    onSignUp(): void;
    onSuccess(): void;
};

export const signInSchema = yup.object({
    name: yup.string().required().label("Name"),
    password: yup.string().required().label("Password"),
});

type SignInFormData = yup.InferType<typeof signInSchema>;

export const SignInForm = ({ onSignUp, onSuccess }: Props) => {
    const authAPI = useAuthAPI();

    const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
        await authAPI.signIn(data.name, data.password);
        onSuccess();
    };

    return (
        <Form
            schema={signInSchema}
            defaultValues={{
                name: "",
                password: "",
            }}
            onSubmit={onSubmit}
        >
            {({ register, formState }) => (
                <>
                    <InputWithLabel
                        {...register("name")}
                        reg={register("name")}
                        label="Name"
                        placeholder="Enter your name"
                        autoComplete="name"
                        error={formState.errors.name}
                    />
                    <InputWithLabel
                        reg={register("password")}
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        error={formState.errors.password}
                    />
                    <SubmitButton>Sign in</SubmitButton>
                    <p className="text-center text-sm text-muted-foreground">
                        {"Don't have an account?"}{" "}
                        <button type="button" className="font-medium text-primary hover:underline" onClick={onSignUp}>
                            Sign up
                        </button>
                    </p>
                </>
            )}
        </Form>
    );
};
