type Props = {
    children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
};

export default RootLayout;
