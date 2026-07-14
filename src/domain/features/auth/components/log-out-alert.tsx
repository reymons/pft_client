import { Alert, AlertExtProps } from "@/components/ui/alert";
import { useAuthAPI } from "@/domain/api/hooks";

type Props = AlertExtProps & {
    onConfirm: () => void;
};

export const LogOutAlert = ({ onConfirm, ...rest }: Props) => {
    const authAPI = useAuthAPI();

    return (
        <Alert
            {...rest}
            title="Are you sure you want to log out?"
            description="You will need to sign in again to access your account"
            actionText="Log out"
            onConfirm={async () => {
                await authAPI.logOut();
                onConfirm();
            }}
        />
    );
};
