import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CategoryModel } from "@/domain/models/category";
import { fuzzySearch } from "@/lib/fuzzy-search";

type Props = {
    categories: CategoryModel[];
    selectedCategories: CategoryModel[];
    onSelect: (category: CategoryModel) => void;
};

export const AddCategoryPopover = ({ categories, selectedCategories, onSelect }: Props) => {
    const [search, setSearch] = useState("");
    const filteredCategories = categories.filter((c) => fuzzySearch(c.name, search));

    return (
        <Popover>
            <PopoverTrigger
                render={(props) => (
                    <Button className="justify-between" variant="outline" {...props}>
                        Add category
                    </Button>
                )}
            />
            <PopoverContent className="w-[350px] p-0" align="start">
                <Command shouldFilter={false}>
                    <CommandInput placeholder="Search categories..." value={search} onValueChange={setSearch} />
                    <CommandEmpty>No categories found</CommandEmpty>
                    <CommandGroup>
                        {filteredCategories.map((c) => {
                            const isSelected = selectedCategories.some((sc) => sc.id === c.id);
                            return (
                                <CommandItem key={c.id} onSelect={() => (isSelected ? null : onSelect(c))}>
                                    {c.name}
                                    {isSelected && <Check className="mr-2 h-4 w-4" />}
                                </CommandItem>
                            );
                        })}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
