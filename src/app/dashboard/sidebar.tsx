import { SidebarNav } from "./sidebar-nav";

export const Sidebar = () => {
    return (
        <aside className="flex w-64 flex-col border-r bg-background hidden md:block">
            <SidebarNav />
        </aside>
    );
};
