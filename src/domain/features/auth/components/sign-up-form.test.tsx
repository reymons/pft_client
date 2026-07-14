import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import { APIProvider } from "@/domain/api/context";
import { MockAuthAPI } from "@/testing/mocks/auth-api";
import { SignUpForm } from "./sign-up-form";

describe("SignUpForm", () => {
    it("signs up with provided user data", async () => {
        const user = {
            name: faker.internet.username(),
            password: faker.internet.password(),
        };
        const onSignUp = vi.fn();
        const authAPI = new MockAuthAPI({ onSignUp });
        const screen = render(
            <APIProvider api={{ auth: authAPI }}>
                <SignUpForm onSignIn={() => {}} onSuccess={() => {}} />
            </APIProvider>,
        );
        await userEvent.type(screen.getByLabelText(/name/i), user.name);
        await userEvent.type(screen.getByLabelText(/^password/i), user.password);
        await userEvent.type(screen.getByLabelText(/confirm password/i), user.password);
        await userEvent.click(screen.getByRole("button", { name: /sign up/i }));
        expect(onSignUp).toHaveBeenCalledOnce();
        expect(onSignUp).toHaveBeenCalledWith(user.name, user.password);
    });

    it("calls onSuccess after successful sign-up", async () => {
        const user = {
            name: faker.internet.username(),
            password: faker.internet.password(),
        };
        const authAPI = new MockAuthAPI({});
        const onSuccess = vi.fn();
        const screen = render(
            <APIProvider api={{ auth: authAPI }}>
                <SignUpForm onSignIn={() => {}} onSuccess={onSuccess} />
            </APIProvider>,
        );
        await userEvent.type(screen.getByLabelText(/name/i), user.name);
        await userEvent.type(screen.getByLabelText(/^password/i), user.password);
        await userEvent.type(screen.getByLabelText(/confirm password/i), user.password);
        await userEvent.click(screen.getByRole("button", { name: /sign up/i }));
        expect(onSuccess).toHaveBeenCalledOnce();
    });

    it("calls onSignIn when clicking on sign-up button", async () => {
        const onSignIn = vi.fn();
        const screen = render(
            <APIProvider api={{}}>
                <SignUpForm onSignIn={onSignIn} onSuccess={() => {}} />)
            </APIProvider>,
        );
        await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
        expect(onSignIn).toHaveBeenCalledOnce();
    });
});
