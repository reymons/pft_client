import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
    header: string;
    children: React.ReactNode;
};

export const SummaryCard = ({ header, children }: Props) => {
    return (
        <Card className="w-[150px] lg:w-[250px]">
            <CardHeader>
                <CardTitle>{header}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-lg">{children}</div>
            </CardContent>
        </Card>
    );
};
