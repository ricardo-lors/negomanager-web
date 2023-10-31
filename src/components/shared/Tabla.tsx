import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'

interface TablaProps {
    columns: any;
    data: any[];
    seleccionado?: string;
    onClickFila?: (arg: any) => void; // MouseEventHandler<HTMLTableRowElement>
    verFooter?: boolean;
}
export const Tabla = ({ data, columns, seleccionado, onClickFila, verFooter = false }: TablaProps) => {

    const tabla = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });


    return (
        // ref={ref}
        <table className="table table-hover">
            <thead>
                {
                    tabla.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))
                }
            </thead>
            <tbody>
                {tabla.getRowModel().rows.map(row => (
                    <tr
                        key={row.id}
                        className={`${seleccionado !== undefined && (row.original.id === seleccionado || row.original.unidad === seleccionado) ? 'table-active' : ''}`}
                        onClick={onClickFila ? () => onClickFila!(row.original) : undefined}
                    >
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id} align={(cell.column.columnDef.meta as any)?.align}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
            {/* {
                verFooter &&
                <tfoot>
                    {table.getFooterGroups().map(footerGroup => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.footer,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            } */}
        </table>
    )
}
