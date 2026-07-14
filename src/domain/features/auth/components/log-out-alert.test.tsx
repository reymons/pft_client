import { render } from "@testing-library/react";
import { APIProvider } from "@/domain/api/context";
import { MockAuthAPI } from "@/testing/mocks/auth-api";
import { LogOutAlert } from "./log-out-alert";
import userEvent from "@testing-library/user-event";

describe("LogOutAlert", () => {
    it("calls logOut method by auth API", async () => {
        const onLogOut = vi.fn();
        const authAPI = new MockAuthAPI({ onLogOut });
        const screen = render(
            <APIProvider api={{ auth: authAPI }}>
                <LogOutAlert open onOpenChange={() => {}} onConfirm={() => {}} />
            </APIProvider>,
        );
        await userEvent.click(screen.getByText(/^log out$/i));
        expect(onLogOut).toHaveBeenCalledOnce();
    });

    it("calls onConfirm after logging out", async () => {
        const onConfirm = vi.fn();
        const screen = render(
            <APIProvider api={{ auth: new MockAuthAPI({}) }}>
                <LogOutAlert open onOpenChange={() => {}} onConfirm={onConfirm} />
            </APIProvider>,
        );
        await userEvent.click(screen.getByText(/^log out$/i));
        expect(onConfirm).toHaveBeenCalledOnce();
    });
});
