import React, { useEffect, useState } from 'react'
import '../style.css'
import {TextField, Paper, Stack, Typography, Button, IconButton, CircularProgress, Tabs, Tab} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import Chart from "../components/Charts"
import DeleteIcon from '@mui/icons-material/Delete';

const CalculationPage = (props) => {

    const {state, calculation, someEmpty, load, dispatchHelpers} = props

    const {omegas, numbers1, numbers2, consts, freedomDegrees, dipole0, dipoleX, dipoleY, dipoleZ} = state

    const {
        dispatchConsts,
        dispatchOmegas,
        dispatchNumbers1,
        dispatchNumbers2,
        dispatchDipole0,
        dispatchDipoleX,
        dispatchDipoleY,
        dispatchDipoleZ,
        dispatchRows
    } = dispatchHelpers

    const [tab, setTab] = useState('x')

    const [selectedRows, setSelectedRows] = useState([])

    const rows=[...state.rows].map((item, index)=>({...item, id: index+1}))

    useEffect(
        () => {
            setSelectedRows(rows)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [state.rows],
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
                    dispatchRows([...rows].filter(item=>item.id !== params.id))
                };

                return <IconButton onClick={onClick}>
                            <DeleteIcon/>
                        </IconButton>
            },
          },
      ];

    const letterIndexes='ijkl'

    useEffect(
        () => {
            dispatchNumbers1(new Array(Number(freedomDegrees)).fill(undefined).map((item, index)=>({var: 'number', index: index+1, value: '', letIndex: letterIndexes[index]})))
            dispatchNumbers2(new Array(Number(freedomDegrees)).fill(undefined).map((item, index)=>({var: 'number', index: index+1, value: '', letIndex: letterIndexes[index]})))
            dispatchOmegas(new Array(Number(freedomDegrees)).fill(undefined).map((item, index)=>({var: 'omega', index: index+1, value: '', letIndex: letterIndexes[index]})))
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [freedomDegrees],
    );

    const onChangeTab = (e, value) => {
        setTab(value)
    }

    const handleChangeNumbers = index => event => {
        let newArr=[...numbers1]
        newArr[index].value=event.target.value
        dispatchNumbers1(newArr)
    };

    const handleChangeNumbers2 = index => event => {
        let newArr=[...numbers2]
        newArr[index].value=event.target.value
        dispatchNumbers2(newArr)
    };

    const handleChangeOmegas = index => event => {
        let newArr=[...omegas]
        newArr[index].value=event.target.value
        dispatchOmegas(newArr)
    };

    const handleChangeConst = index => event => {
        let newArr=[...consts]
        newArr[index].value=event.target.value
        dispatchConsts(newArr.map(item=>({...item, letIndex: item.index.replace(/1/g,'i').replace(/2/g,'j').replace(/3/g,'k')})))
    };

    const handleChangeDipoleX = index => event => {
        let newArr=[...dipoleX]
        newArr[index].value=event.target.value
        dispatchDipoleX(newArr.map(item=>({...item, letIndex: item.index.replace(/1/g,'i').replace(/2/g,'j').replace(/3/g,'k')})))
    };

    const handleChangeDipoleY = index => event => {
        let newArr=[...dipoleY]
        newArr[index].value=event.target.value
        dispatchDipoleY(newArr.map(item=>({...item, letIndex: item.index.replace(/1/g,'i').replace(/2/g,'j').replace(/3/g,'k')})))
    };

    const handleChangeDipoleZ = index => event => {
        let newArr=[...dipoleZ]
        newArr[index].value=event.target.value
        dispatchDipoleZ(newArr.map(item=>({...item, letIndex: item.index.replace(/1/g,'i').replace(/2/g,'j').replace(/3/g,'k')})))
    };

    const handleChangeDipole0 = (e) => {
        dispatchDipole0({...dipole0, value: e.target.value})
    }

    return(
        <div className={'container'}>

            <Paper className={'box1'}>
                <div className='block'>
                    <Typography variant="subtitle">Начальное состояние</Typography>
                    <Stack direction={'column'} alignItems={'center'}>
                        
                        {numbers1.map((item,index)=>
                            <TextField 
                                key={item.index+'omega'} 
                                size={'small'} 
                                style={{margin:10}} 
                                label={<span>n<sub>{item.index}</sub></span>} 
                                value={item.value}
                                onChange={handleChangeNumbers(index)}
                            />
                        )}

                    </Stack>
                </div>

                <div className='block'>
                    <Typography variant="subtitle">Конечное состояние</Typography>
                    <Stack direction={'column'} alignItems={'center'}>
                    
                        {numbers2.map((item,index)=>
                            <TextField 
                                key={item.index+'omega'} 
                                size={'small'} 
                                style={{margin:10}} 
                                label={<span>n<sub>{item.index}</sub></span>} 
                                value={item.value}
                                onChange={handleChangeNumbers2(index)}
                            />
                        )}

                    </Stack>
                </div>
            </Paper>

            <Paper className={'box2'}>
                <div className='block'>
                    <Typography variant="subtitle">Гармонические частоты</Typography>
                    <Stack direction={'column'} alignItems={'center'}>
                        
                        {omegas.map((item, index)=>
                            <TextField 
                                key={item.index+'omega'} 
                                size={'small'} 
                                style={{margin:10}} 
                                label={<span>{decodeURI('%CF%89')}<sub>{item.index}</sub></span>} 
                                value={item.value}
                                onChange={handleChangeOmegas(index)}
                            />
                        )}

                    </Stack>
                </div>
            </Paper>
            
            <Paper className={'box3'}>
                <div className='block'>
                    <Typography variant="subtitle">Силовые постоянные</Typography>
                    <div style={{display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                            }} 
                    >

                        {consts.map((item, index)=>
                            <TextField
                                key={item.index+'const'}
                                size={'small'} 
                                style={{margin:10, width:'15%', minWidth:80}} 
                                label={<span>a<sub>{item.index}</sub></span>} 
                                value={item.value}
                                onChange={handleChangeConst(index)}
                            />
                        )}

                    </div>
                </div>
            </Paper>

            <Paper className={'box4'}>
                <div className='block'>
                    <Typography variant="subtitle">Производные дипольного момента</Typography>

                    <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                        <Tabs value={tab} onChange={onChangeTab} variant="fullWidth">
                            <Tab label="X" value="x" />
                            <Tab label="Y" value="y" />
                            <Tab label="Z" value="z" />
                        </Tabs>
                    </div>

                    <div style={{display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'center'
                            }} 
                    >

                        <TextField
                            key={'dipole0'}
                            size={'small'} 
                            style={{margin:10, width:'20%', minWidth:80}} 
                            label={<span>d<sub>0</sub></span>} 
                            value={dipole0.value}
                            onChange={handleChangeDipole0}
                        />

                        {tab === 'x' && dipoleX.map((item, index)=>
                            <TextField
                                key={item.index+'dipoleY'}
                                size={'small'} 
                                style={{margin:10, width:'20%', minWidth:80}} 
                                label={<span>d<sub>{item.index}</sub></span>} 
                                value={item.value}
                                onChange={handleChangeDipoleX(index)}
                            />
                        )}

                        {tab === 'y' && dipoleY.map((item, index)=>
                            <TextField
                                key={item.index+'dipoleY'}
                                size={'small'} 
                                style={{margin:10, width:'20%', minWidth:80}} 
                                label={<span>d<sub>{item.index}</sub></span>} 
                                value={item.value}
                                onChange={handleChangeDipoleY(index)}
                            />
                        )}

                        {tab === 'z' && dipoleZ.map((item, index)=>
                            <TextField
                                key={item.index+'dipoleZ'}
                                size={'small'} 
                                style={{margin:10, width:'20%', minWidth:80}} 
                                label={<span>d<sub>{item.index}</sub></span>} 
                                value={item.value}
                                onChange={handleChangeDipoleZ(index)}
                            />
                        )}

                    </div>
                </div>
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
                        selectionModel={selectedRows.map(item=>item.id)}
                        onSelectionModelChange={x=>
                        {
                            setSelectedRows(x.map(item=>rows.find(obj=>obj.id===Number(item))))
                        }}
                    />
                </div>
            </Paper>

            <Paper className={'box6'}>
                <Chart data={selectedRows}/>
            </Paper>

            <Paper className={'box7'}>
                <Button 
                    endIcon={load ? <CircularProgress size={20}/> : ''} 
                    fullWidth={true} 
                    variant='contained' 
                    onClick={calculation} 
                    disabled={someEmpty || load}
                    style={{margin:'0px 5px'}}
                >
                    Расчет
                </Button>

                <Button 
                    /* endIcon={load ? <CircularProgress size={20}/> : ''}  */
                    fullWidth={true} 
                    variant='contained' 
                    disabled
                    /* disabled={someEmpty || load} */
                    style={{margin:'0px 5px'}}
                >
                    Резонанс
                </Button>
            </Paper>
            
        </div>
    )
}

export default CalculationPage