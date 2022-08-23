import React, { useState } from 'react'
import './style.css'
import {TextField, Paper, Stack } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import Chart from "../components/Charts"

export const Page = () => {

    const columns = [
        {
            field: 'transition', 
            headerName: 'Переход', 
            width: 80,
            sortable:false 
        },
        {
            field: 'energy',
            headerName: 'Энергия',
            width: 150,
            sortable:false,
        },
        {
            field: 'matrix',
            headerName: 'Матричный элемент',
            width: 200,
            sortable:false,
        }
      ];
      
      const rows = [
        { id: 1, transition: '0 => 0', energy: 0, matrix: 446.4995 },
        { id: 2, transition: '0 => 1', energy: 2309.036, matrix: -4.9995 },
        { id: 3, transition: '0 => 2', energy: 4618.1079, matrix: 2.1212 },
        { id: 4, transition: '0 => 3', energy: 6927.2158, matrix: -0.8167 },
        { id: 5, transition: '0 => 4', energy: 9236.3597, matrix: 0.0002 },
        { id: 6, transition: '0 => 5', energy: 11545.5395, matrix: 0 },    
      ];

    const [value1,setValue1] = useState([{value:2309, index:'1'}])
    const [value2,setValue2] = useState([{value:-0.095,index:'1,1,1'},{value:0.0103,index:'1,1,1,1'},{value:0,index:'1,1,1,1,1'}])
    const [value3,setValue3] = useState([{value:0.445,index:'0'},{value:-0.00552,index:'1'},{value:0.00568,index:'1,1'},{value:-0.00505,index:'1,1,1'}])

    const [selectedRows,setSelectedRows] = useState([])

    const handleChange1 = index => event => {
        let newArr=[...value1]
        newArr[index].value=event.target.value
        setValue1(newArr);
    };

    const handleChange2 = index => event => {
        let newArr=[...value2]
        newArr[index].value=event.target.value
        setValue2(newArr);
        console.log(value2)
    };

    const handleChange3 = index => event => {
        let newArr=[...value3]
        newArr[index].value=event.target.value
        setValue3(newArr);
    };

    return(
        <div className='container'>
            <Paper className={'box1'}>
                <Stack direction={'column'} alignItems='center'>
                    {value1.map((item,index)=>
                        <TextField key={item.index+'-omega'} size='small' style={{margin:15}} label={decodeURI('%CF%89')+item.index} value={item.value} onChange={handleChange1(index)}/>
                    )}
                </Stack>
            </Paper>

            <Paper className={'box2'}>
                <Stack direction={'column'} alignItems='center'>
                    {value2.map((item,index) => 
                        <TextField key={item.index+'-k'} size='small' style={{margin:15}} label={'k '+item.index} value={item.value} onChange={handleChange2(index)}/>
                    )}
                </Stack>
            </Paper>

            <Paper className={'box3'}>
                <Stack direction={'column'} alignItems='center'>
                    {value3.map((item,index) => 
                        <TextField key={item.index+'-d'} size='small' style={{margin:15}} label={'d '+item.index} value={item.value} onChange={handleChange3(index)}/>
                    )}
                </Stack>
            </Paper>

            <Paper className={'box4'}>
                <div style={{ height: '100%', width: '100%' }}>
                    <DataGrid
                    autoHeight
                        rows={rows}
                        columns={columns}
                        checkboxSelection
                        disableColumnMenu
                        hideFooter
                        onSelectionModelChange={(x) => {setSelectedRows(x.map(item=>rows.find(obj=>obj.id===Number(item))))}}
                    />
                </div>
            </Paper>

            <Paper className={'box6'}>
                <Chart data={selectedRows}/>
            </Paper>
        </div>
    )
}

export default Page