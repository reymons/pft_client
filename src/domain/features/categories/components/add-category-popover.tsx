import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CategoryModel } from "@/domain/models/category";
import { fuzzySearch } from "@/lib/fuzzy-search";

type Props = {
    categories: CategoryModel[];
    selectedCategories: CategoryModel[];
    onSelect: (category: CategoryModel) => void;
    withToggle?: boolean;
    withClear?: boolean;
    onClear?: () => void;
    triggerText?: string;
    isLoading?: boolean;
};

export const AddCategoryPopover = ({
    categories,
    selectedCategories,
    onSelect,
    withToggle,
    triggerText,
    isLoading,
    withClear,
    onClear,
}: Props) => {
    const [search, setSearch] = useState("");
    const filteredCategories = categories.filter((c) => fuzzySearch(c.name, search));

    const select = (category: CategoryModel, isSelected: boolean) => {
        if (isSelected && !withToggle) return;
        onSelect(category);
    };

    return (
        <Popover>
            <PopoverTrigger
                render={(props) => (
                    <Button className="justify-between" variant="outline" {...props}>
                        {triggerText ?? "Add category"}
                    </Button>
                )}
            />
            <PopoverContent className="w-[350px] p-0" align="start">
                {isLoading && <Loader2 />}
                {!isLoading && (
                    <Command shouldFilter={false}>
                        <CommandInput placeholder="Search categories..." value={search} onValueChange={setSearch} />
                        <CommandEmpty>No categories found</CommandEmpty>
                        <CommandGroup>
                            {filteredCategories.map((c) => {
                                const isSelected = selectedCategories.some((sc) => sc.id === c.id);
                                return (
                                    <CommandItem key={c.id} onSelect={() => select(c, isSelected)}>
                                        {c.name}
                                        {isSelected && <Check className="mr-2 h-4 w-4" />}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </Command>
                )}
                {withClear && (
                    <div className="border-t p-1">
                        <Button className="w-full" variant="outline" size="sm" onClick={onClear}>
                            Clear
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
};
