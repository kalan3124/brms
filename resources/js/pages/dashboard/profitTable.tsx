import { router } from '@inertiajs/react';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import * as React from 'react';

import { currency } from '@/common/currency';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Income } from '@/types/dashboard/types';

type propsData = {
    type: string;
    data: { income: Income[] };
    available_bikes?: number;
    title: string;
    available: boolean;
};

const columns: ColumnDef<Income>[] = [
    {
        accessorKey: 'bike_no',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Bike no
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => <div className="capitalize">{row.getValue('bike_no')}</div>,
    },
    {
        accessorKey: 'year',
        header: 'Year',
        cell: ({ row }) => <div className="lowercase">{row.getValue('year')}</div>,
    },
    {
        accessorKey: 'profit',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Profit
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('profit'));

            return <div className="text-left font-medium">{currency(amount)}</div>;
        },
    },
    {
        accessorKey: 'available',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Availability
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => {
            let available = row.getValue('available');
            if (available != null)
                return (
                    <div className="text-left font-medium">
                        <Button
                            className="cursor-pointer"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                if (available) {
                                    available = 0;
                                } else {
                                    available = 1;
                                }
                                // router.post(route('dashboard.update.availability'), {
                                //     bike_no: row.original.bike_no,
                                //     available: available,
                                // });
                            }}
                        >
                            {available ? 'Available' : 'Not Available'}
                        </Button>
                    </div>
                );
        },
    },
];

export function ProfitTable(props: propsData) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [filterType, setFilterType] = React.useState<string>('year');
    // const { test } = usePage().props;

    if (props.type === 'month_income') {
        // columns.splice(3);
        // console.log(columns);
    }

    const table = useReactTable({
        data: props.data.income,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="mt-0 mr-3 ml-3 rounded-lg border-1 border-gray-200 p-4">
            <Label className="ml-4 text-xl" htmlFor="email">
                {props.title + ' ' + new Date().getFullYear()}
            </Label>
            <div>
                {filterType === 'year' ? (
                    <div className="w-full p-4">
                        <div className="flex items-center py-4">
                            <Input
                                placeholder="Filter bike no..."
                                value={(table.getColumn('bike_no')?.getFilterValue() as string) ?? ''}
                                onChange={(event) => table.getColumn('bike_no')?.setFilterValue(event.target.value)}
                                className="max-w-sm"
                            />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="ml-auto">
                                        Columns <ChevronDown />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {table
                                        .getAllColumns()
                                        .filter((column) => column.getCanHide())
                                        .map((column) => {
                                            return (
                                                <DropdownMenuCheckboxItem
                                                    key={column.id}
                                                    className="capitalize"
                                                    checked={column.getIsVisible()}
                                                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                                >
                                                    {column.id}
                                                </DropdownMenuCheckboxItem>
                                            );
                                        })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => {
                                                return (
                                                    <TableHead key={header.id}>
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                                    </TableHead>
                                                );
                                            })}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                                No results.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex items-center justify-end space-x-2 py-4">
                            <div className="text-muted-foreground flex-1 text-sm">
                                {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
                            </div>
                            <div className="space-x-2">
                                <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                                    Previous
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-4">Monthly view is under development.</div>
                )}
            </div>
        </div>
    );
}
