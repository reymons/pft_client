"use client";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarNav } from "./sidebar-nav";
import { useState } from "react";

export const HeaderBurger = () => {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
                <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent>
                <SidebarNav onNavigate={() => setOpen(false)} />
            </SheetContent>
        </Sheet>
    );
};
