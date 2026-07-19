"use client";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof Calendar> & {
    invalid?: boolean;
};

export const DatePicker = ({ id, invalid, ...rest }: Props) => {
    let date: Date | undefined = undefined;
    if (rest.mode === "single") {
        date = rest.selected;
    }

    return (
        <Popover>
            <PopoverTrigger
                render={
                    <Button
                        id={id}
                        variant="outline"
                        aria-invalid={invalid}
                        data-empty={!date}
                        className={cn(
                            invalid && "border-destructive ring-destructive/20",
                            "w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground",
                        )}
                    >
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                        <ChevronDownIcon data-icon="inline-end" />
                    </Button>
                }
            />
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar {...rest} />
            </PopoverContent>
        </Popover>
    );
};
