import { Header } from "./header";
import { Sidebar } from "./sidebar";

type Props = {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <div className="h-screen flex flex-col">
            <Header />
            <div className="flex grow bg-muted/30 min-h-0">
                <Sidebar />
                <div className="flex flex-1 flex-col custom-scrollbar overflow-auto min-h-0">
                    <main className="flex-1 p-5 lg:p-8">{children}</main>
                </div>
            </div>
        </div>
    );
};

export default Layout;
