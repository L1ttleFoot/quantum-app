import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import './style.css'
import {TextField, Paper, Stack, Typography, Button} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import Chart from "../../../components/Charts"

//mport Field from "../components/ConstantsFields"

const Page = (props) => {

    const dispatch = useDispatch()

    const {state, constsList} = props

    const [selectedRows, setSelectedRows] = useState([])

    const setRows = (value) => {
        dispatch({type:'SET_ROWS', payload: value})
    }

    const rows=[...state.rows].map((item, index)=>({...item, id: index+1, matrix: 1}))

    const columns = [
        {
            field: 'transition', 
            headerName: 'Переход', 
            width: 100,
            sortable: false 
        },
        {
            field: 'energy',
            headerName: 'Энергия',
            width: 130,
            sortable: false,
        },
        {
            field: 'matrix',
            headerName: 'Матричный элемент',
            width: 200,
            sortable: false,
        },
        {
            field: 'delet',
            headerName: '',
            sortable: false,
            renderCell: (params) => {

              const onClick = (e) => {
                e.stopPropagation(); // don't select this row after clicking
            
                setRows([...rows].filter(item=>item.id !== params.id))
                
              };
        
              return <Button onClick={onClick}>Click</Button>;
            },
          },
      ];

    
    
    /* const rows = [
        { id: 1, transition: '0 => 0', energy: 0, matrix: 446.4995 },
        { id: 2, transition: '0 => 1', energy: 2309.036, matrix: -4.9995 },
        { id: 3, transition: '0 => 2', energy: 4618.1079, matrix: 2.1212 },
        { id: 4, transition: '0 => 3', energy: 6927.2158, matrix: -0.8167 },
        { id: 5, transition: '0 => 4', energy: 9236.3597, matrix: 0.0002 },
        { id: 6, transition: '0 => 5', energy: 11545.5395, matrix: 0 },    
    ];  */

    const letterIndexes='ijkl'

    const numbersArr1 = new Array(Number(state.freedomDegrees)).fill(undefined).map((item, index)=>({var: 'number', index: index+1, value: '', letIndex: letterIndexes[index]}))
    const numbersArr2 = new Array(Number(state.freedomDegrees)).fill(undefined).map((item, index)=>({var: 'number', index: index+1, value: '', letIndex: letterIndexes[index]}))
    const omegasArr = new Array(Number(state.freedomDegrees)).fill(undefined).map((item, index)=>({var: 'omega', index: index+1, value: '', letIndex: letterIndexes[index]}))
    const constsArr = [...constsList]

    const [numbersList1, setNumbersList] = useState([])
    const [numbersList2, setNumbersList2] = useState([])
    const [omegasList, setOmegasList] = useState([])
    //const [newConstList, setNewConstList] = useState([])

    const setNumbers = (value) => {
        dispatch({type:'SET_NUMBERS1', payload:value})    
    }

    const setNumbers2 = (value) => {
        dispatch({type:'SET_NUMBERS2', payload:value})    
    }

    const setOmegas = (value) => {
        dispatch({type:'SET_OMEGAS', payload:value})    
    }

    const setConst = (value) => {
        dispatch({type:'SET_CONSTS', payload:value})    
    }

    useEffect(
        () => {
            setNumbersList(numbersArr1)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [state.freedomDegrees],
    );

    useEffect(
        () => {
            setNumbersList2(numbersArr2)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [state.freedomDegrees],
    );

    useEffect(
        () => {
            setOmegasList(omegasArr)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [state.freedomDegrees],
    );

    const handleChangeNumbers = index => event => {
        let newArr=[...numbersList1]
        newArr[index].value=event.target.value
        setNumbers(newArr)
    };

    const handleChangeNumbers2 = index => event => {
        let newArr=[...numbersList2]
        newArr[index].value=event.target.value
        setNumbers2(newArr)
    };

    const handleChangeOmegas = index => event => {
        let newArr=[...omegasList]
        newArr[index].value=event.target.value
        setOmegas(newArr)
    };

    const handleChangeConst = index => event => {
        let newArr=[...constsArr]
        newArr[index].value=event.target.value
        setConst(newArr.map(item=>({...item, letIndex: item.index.replace(/1/g,'i').replace(/2/g,'j').replace(/3/g,'k')})))
    };

    return(
        <div className={'container'}>

            <Paper className={'box1'}>
                <Stack direction={'column'} alignItems={'center'}>
                    <Typography variant="subtitle2">Начальное состояние</Typography>

                    {numbersList1.map((item,index)=>
                        <TextField 
                            key={item.index+'omega'} 
                            size={'small'} 
                            style={{margin:15}} 
                            label={<span>n<sub>{item.index}</sub></span>} 
                            value={item.value}
                            onChange={handleChangeNumbers(index)}
                        />
                    )}

                </Stack>

                <Stack direction={'column'} alignItems={'center'}>
                <Typography variant="subtitle2">Конечное состояние</Typography>

                    {numbersList2.map((item,index)=>
                        <TextField 
                            key={item.index+'omega'} 
                            size={'small'} 
                            style={{margin:15}} 
                            label={<span>n<sub>{item.index}</sub></span>} 
                            value={item.value}
                            onChange={handleChangeNumbers2(index)}
                        />
                    )}

                </Stack>
            </Paper>

            <Paper className={'box2'}>
                <Stack direction={'column'} alignItems={'center'}>
                <Typography variant="subtitle2">Фундоментальные частоты</Typography>

                    {omegasList.map((item, index)=>
                        <TextField 
                            key={item.index+'omega'} 
                            size={'small'} 
                            style={{margin:15}} 
                            label={<span>{decodeURI('%CF%89')}<sub>{item.index}</sub></span>} 
                            value={item.value}
                            onChange={handleChangeOmegas(index)}
                        />
                    )}

                </Stack>
              </Paper>

            <Paper className={'box3'}>
                
                <div style={{display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'center'
                        }} 
                >

                    {constsArr.map((item, index)=>
                        <TextField
                            key={item.index+'const'}
                            size={'small'} 
                            style={{margin:15, width:'25%'}} 
                            label={<span>a<sub>{item.index}</sub></span>} 
                            value={item.value}
                            onChange={handleChangeConst(index)}
                        />
                    )}

                </div>
            </Paper>

            <Paper className={'box4'}>
                <Stack direction={'column'} alignItems={'center'}>
                    
                </Stack>
            </Paper>

            <Paper className={'box5'}>
                <div >
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