import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAction } from '../../slice/useAction';

const Table = (props) => {

    const { setRows } = useAction()

    const { updateSelectedRows, selectedRows } = props

    const data = useSelector(state => state.data)

    const { rows } = data

    const myRows = [...rows].map((item, index) => ({ ...item, id: index + 1, energy: parseFloat(item.energy).toFixed(2) }))

    useEffect(
        () => {
            updateSelectedRows(myRows)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [rows],
    );

    const columns = [
        {
            field: 'transition',
            headerName: 'Переход',
            width: 90,
            sortable: false
        },
        {
            field: 'energy',
            headerName: 'Энергия',
            width: 120,
            sortable: false,
        },
        {
            field: 'matrix',
            headerName: 'Матричный элемент',
            width: 180,
            sortable: false,
        },
        {
            field: 'delete',
            headerName: '',
            width: 60,
            sortable: false,
            renderCell: (params) => {

                const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking
                    setRows([...myRows].filter(item => item.id !== params.id))
                };

                return <IconButton onClick={onClick}>
                    <DeleteIcon />
                </IconButton>
            },
        },
    ];

    return (
        <div >
            <DataGrid
                autoHeight
                rows={myRows}
                columns={columns}
                checkboxSelection
                disableColumnMenu
                hideFooter
                selectionModel={selectedRows.map(item => item.id)}
                onSelectionModelChange={x => {
                    updateSelectedRows(x.map(item => myRows.find(obj => obj.id === Number(item))))
                }}
            />
        </div>
    )
}

export default Table