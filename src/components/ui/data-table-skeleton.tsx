import { flexRender, Table as ReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { Skeleton } from "./skeleton";

type Props<T> = {
    table: ReactTable<T>;
};

export const DataTableSkeleton = <T,>({ table }: Props<T>) => {
    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((hg) => (
                    <TableRow key={hg.id}>
                        {hg.headers.map((hdr) => (
                            <TableHead key={hdr.id}>
                                {hdr.isPlaceholder && null}
                                {!hdr.isPlaceholder && flexRender(hdr.column.columnDef.header, hdr.getContext())}
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {Array.from({ length: 10 }).map((_, i) => (
                    <TableRow key={i}>
                        {table.getVisibleLeafColumns().map((col) => (
                            <TableCell key={col.id}>
                                <div style={{ width: col.getSize() }}>
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
