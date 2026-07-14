import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import { APIProvider } from "@/domain/api/context";
import { SignInForm } from "./sign-in-form";
import { MockAuthAPI } from "@/testing/mocks/auth-api";

describe("SignInForm", () => {
    it("signs in with provided user data", async () => {
        const user = {
            name: faker.internet.username(),
            password: faker.internet.password(),
        };
        const onSignIn = vi.fn();
        const authAPI = new MockAuthAPI({ onSignIn });
        const screen = render(
            <APIProvider api={{ auth: authAPI }}>
                <SignInForm onSignUp={() => {}} onSuccess={() => {}} />
            </APIProvider>,
        );
        await userEvent.type(screen.getByLabelText(/name/i), user.name);
        await userEvent.type(screen.getByLabelText(/password/i), user.password);
        await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
        expect(onSignIn).toHaveBeenCalledOnce();
        expect(onSignIn).toHaveBeenCalledWith(user.name, user.password);
    });

    it("calls onSuccess after successful sign-in", async () => {
        const user = {
            name: faker.internet.username(),
            password: faker.internet.password(),
        };
        const authAPI = new MockAuthAPI({});
        const onSuccess = vi.fn();
        const screen = render(
            <APIProvider api={{ auth: authAPI }}>
                <SignInForm onSignUp={() => {}} onSuccess={onSuccess} />
            </APIProvider>,
        );
        await userEvent.type(screen.getByLabelText(/name/i), user.name);
        await userEvent.type(screen.getByLabelText(/password/i), user.password);
        await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
        expect(onSuccess).toHaveBeenCalledOnce();
    });

    it("calls onSignUp when clicking on sign-up button", async () => {
        const onSignUp = vi.fn();
        const screen = render(
            <APIProvider api={{}}>
                <SignInForm onSignUp={onSignUp} onSuccess={() => {}} />)
            </APIProvider>,
        );
        await userEvent.click(screen.getByRole("button", { name: /sign up/i }));
        expect(onSignUp).toHaveBeenCalledOnce();
    });
});
