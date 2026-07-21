import { cn } from "@/lib/utils";
import { Skeleton } from "../skeleton";

type Props = {
    className: string;
};

export const CardSkeleton = ({ className }: Props) => {
    return <Skeleton className={cn("rounded-xl", className)} />;
};
