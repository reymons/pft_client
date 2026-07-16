type Props = {
    title: string;
    description: string;
    beforeEnd?: React.ReactNode;
};

export const SectionHeader = ({ title, description, beforeEnd }: Props) => {
    return (
        <div className="mb-6 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            {beforeEnd}
        </div>
    );
};
