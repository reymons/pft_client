import { ArrowLeft, ArrowRight } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { TransactionModel, TransactionType } from "@/domain/models/transaction";
import { AddCategoryPopover } from "@/domain/features/categories/components/add-category-popover";
import { CategoryModel } from "@/domain/models/category";
import { useCategoriesAPI } from "@/domain/api/hooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectTransactionTypeRaw } from "./select-transaction-type";

type Props = {
    table: Table<TransactionModel>;
};

export const TransactionsTablePanel = ({ table }: Props) => {
    const categoriesAPI = useCategoriesAPI();
    const [categories, categoriesState] = categoriesAPI.useDefault();

    return (
        <div className="flex items-center gap-3 mb-3 flex-wrap">
            <Input
                className="w-[200px]"
                placeholder="Search name..."
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
            />
            <div>
                <SelectTransactionTypeRaw
                    value={(table.getColumn("type")?.getFilterValue() as TransactionType) ?? null}
                    onValueChange={(v) => {
                        const col = table.getColumn("type");
                        const filter = col?.getFilterValue() as TransactionType | undefined;
                        if (filter === v) col?.setFilterValue(undefined);
                        else col?.setFilterValue(v);
                    }}
                />
            </div>
            <AddCategoryPopover
                withToggle
                withClear
                onClear={() => table.getColumn("category")?.setFilterValue([])}
                isLoading={categoriesState.isLoading}
                triggerText="Pick a category"
                categories={categories ?? []}
                selectedCategories={(table.getColumn("category")?.getFilterValue() as CategoryModel[]) ?? []}
                onSelect={(category) => {
                    const col = table.getColumn("category");
                    if (!col) return;
                    const categories = col.getFilterValue() as CategoryModel[];
                    const exists = categories.some((c) => c.id === category.id);
                    let newCategories: CategoryModel[];
                    if (exists) {
                        newCategories = categories.filter((c) => c.id !== category.id);
                    } else {
                        newCategories = [...categories, category];
                    }
                    col.setFilterValue(newCategories);
                }}
            />
            <div className="ml-auto flex gap-2 basis-[0] basis-full lg:basis-auto">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ArrowLeft />
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ArrowRight />
                </Button>
            </div>
        </div>
    );
};
