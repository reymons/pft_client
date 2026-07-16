import * as yup from "yup";
import { Form, SubmitHandler } from "@/components/ui/form/form";
import { InputWithLabel } from "@/components/ui/form/input";
import { SubmitButton } from "@/components/ui/form/submit-button";
import { CategoryModel } from "@/domain/models/category";

const schema = yup.object({
    name: yup.string().required().label("Name"),
});

export type CreateCategoryFormData = yup.InferType<typeof schema>;

type Props = {
    category?: CategoryModel;
    isEdit?: boolean;
    onSubmit: SubmitHandler<CreateCategoryFormData>;
};

export const CreateCategoryFormView = ({ category, onSubmit, isEdit }: Props) => {
    return (
        <Form schema={schema} defaultValues={{ name: category?.name ?? "" }} onSubmit={onSubmit}>
            {({ register, formState }) => (
                <>
                    <InputWithLabel
                        reg={register("name")}
                        error={formState.errors.name}
                        placeholder="Enter a category name"
                        label="Name"
                    />
                    <SubmitButton>{isEdit ? "Save" : "Create"}</SubmitButton>
                </>
            )}
        </Form>
    );
};
