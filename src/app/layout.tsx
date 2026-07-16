import { AppConfig } from "./config";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import "./global.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

type Props = {
    children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
    return (
        <html lang="en" className={cn("font-sans", geist.variable, "dark")}>
            <body>
                <AppConfig />
                {children}
            </body>
        </html>
    );
};

export default RootLayout;
