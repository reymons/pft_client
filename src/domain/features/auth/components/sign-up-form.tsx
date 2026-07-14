"use client";
import * as yup from "yup";
import { useAuthAPI } from "@/domain/api/hooks";
import { Form, type SubmitHandler } from "@/components/ui/form/form";
import { SubmitButton } from "@/components/ui/form/submit-button";
import { InputWithLabel } from "@/components/ui/form/input";

type Props = {
    onSignIn(): void;
    onSuccess(): void;
};

export const signUpSchema = yup.object({
    name: yup.string().required().max(50).label("Name"),
    password: yup.string().required().min(6).max(60).label("Password"),
    cpassword: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "Passwords do not match")
        .label("Confirm password"),
});

type SignUpFormData = yup.InferType<typeof signUpSchema>;

export const SignUpForm = ({ onSignIn, onSuccess }: Props) => {
    const authAPI = useAuthAPI();

    const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
        await authAPI.signUp(data.name, data.password);
        onSuccess();
    };

    return (
        <Form
            schema={signUpSchema}
            defaultValues={{
                name: "",
                password: "",
                cpassword: "",
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
                    <InputWithLabel
                        reg={register("cpassword")}
                        label="Confirm password"
                        type="password"
                        placeholder="Re-enter your password"
                        autoComplete="off"
                        error={formState.errors.cpassword}
                    />
                    <SubmitButton>Sign up</SubmitButton>
                    <p className="text-center text-sm text-muted-foreground">
                        {"Don't have an account?"}{" "}
                        <button type="button" className="font-medium text-primary hover:underline" onClick={onSignIn}>
                            Sign in
                        </button>
                    </p>
                </>
            )}
        </Form>
    );
};
