import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import '../style.css'
import {TextField, Paper, Stack, Typography, Button, IconButton, CircularProgress, Tabs, Tab } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import Chart from "../../../../components/Charts"
import DeleteIcon from '@mui/icons-material/Delete';

//mport Field from "../components/ConstantsFields"

const CalculationPage = (props) => {

    const dispatch = useDispatch()

    const {state, constsList, dipoleXList, dipoleYList, dipoleZList, calculation, someEmpty, load} = props

    const [selectedRows, setSelectedRows] = useState([])

    //const [dipole0, setDipole0] = useState({index: '0', value: '', var: 'dipole0', letIndex: '0'})

    const [tab, setTab] = useState('x')

    const setRows = (value) => {
        dispatch({type:'SET_ROWS', payload: value})
    }

    const rows=[...state.rows].map((item, index)=>({...item, id: index+1}))

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
            field: 'delet',
            headerName: '',
            width: 60,
            sortable: false,
            renderCell: (params) => {

              const onClick = (e) => {
                e.stopPropagation(); // don't select this row after clicking
            
                setRows([...rows].filter(item=>item.id !== params.id))
                
              };
        
              return <IconButton onClick={onClick}>
                        <DeleteIcon/>
                    </IconButton>
            },
          },
      ];

    const letterIndexes='ijkl'

    const numbersArr1 = new Array(Number(state.freedomDegrees)).fill(undefined).map((item, index)=>({var: 'number', index: index+1, value: '', letIndex: letterIndexes[index]}))
    const numbersArr2 = new Array(Number(state.freedomDegrees)).fill(undefined).map((item, index)=>({var: 'number', index: index+1, value: '', letIndex: letterIndexes[index]}))
    const omegasArr = new Array(Number(state.freedomDegrees)).fill(undefined).map((item, index)=>({var: 'omega', index: index+1, value: '', letIndex: letterIndexes[index]}))
    const constsArr = [...constsList]   

    const dipoleXArr = [...dipoleXList]
    const dipoleYArr = [...dipoleYList]
    const dipoleZArr = [...dipoleZList]

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

    const setDipole0 = (value) => {
        dispatch({type:'SET_DIPOLE_0', payload:value})    
    }

    const setDipoleX = (value) => {
        dispatch({type:'SET_DIPOLE_X', payload:value})    
    }

    const setDipoleY = (value) => {
        dispatch({type:'SET_DIPOLE_Y', payload:value})    
    }

    const setDipoleZ = (value) => {
        dispatch({type:'SET_DIPOLE_Z', payload:value})    
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
            setOmegasList(new Array(Number(state.freedomDegrees)).fill(undefined).map((item, index)=>({var: 'omega', index: index+1, value: '', letIndex: letterIndexes[index]}))
            )
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [state.freedomDegrees],
    );

    useEffect(
        () => {
            setOmegasList(state.omegas)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [state.omegas],
    );

    const onChangeTab = (e, value) => {
        setTab(value)
    }

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

    const handleChangeDipoleX = index => event => {
        let newArr=[...dipoleXArr]
        newArr[index].value=event.target.value
        setDipoleX(newArr.map(item=>({...item, letIndex: item.index.replace(/1/g,'i').replace(/2/g,'j').replace(/3/g,'k')})))
    };

    const handleChangeDipoleY = index => event => {
        let newArr=[...dipoleYArr]
        newArr[index].value=event.target.value
        setDipoleY(newArr.map(item=>({...item, letIndex: item.index.replace(/1/g,'i').replace(/2/g,'j').replace(/3/g,'k')})))
    };

    const handleChangeDipoleZ = index => event => {
        let newArr=[...dipoleZArr]
        newArr[index].value=event.target.value
        setDipoleZ(newArr.map(item=>({...item, letIndex: item.index.replace(/1/g,'i').replace(/2/g,'j').replace(/3/g,'k')})))
    };

    const handleChangeDipole0 = (e) => {
        setDipole0({...state.dipole0, value: e.target.value})
    }

    return(
        <div className={'container'}>

            <Paper className={'box1'}>
                <div className='block'>
                    <Typography variant="subtitle">Начальное состояние</Typography>
                    <Stack direction={'column'} alignItems={'center'}>
                        
                        {numbersList1.map((item,index)=>
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
                    
                        {numbersList2.map((item,index)=>
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
                        
                        {omegasList.map((item, index)=>
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

                        {constsArr.map((item, index)=>
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
                            value={state.dipole0.value}
                            onChange={handleChangeDipole0}
                        />

                        {tab === 'x' && dipoleXArr.map((item, index)=>
                            <TextField
                                key={item.index+'dipoleY'}
                                size={'small'} 
                                style={{margin:10, width:'20%', minWidth:80}} 
                                label={<span>d<sub>{item.index}</sub></span>} 
                                value={item.value}
                                onChange={handleChangeDipoleX(index)}
                            />
                        )}

                        {tab === 'y' && dipoleYArr.map((item, index)=>
                            <TextField
                                key={item.index+'dipoleY'}
                                size={'small'} 
                                style={{margin:10, width:'20%', minWidth:80}} 
                                label={<span>d<sub>{item.index}</sub></span>} 
                                value={item.value}
                                onChange={handleChangeDipoleY(index)}
                            />
                        )}

                        {tab === 'z' && dipoleZArr.map((item, index)=>
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
                        onSelectionModelChange={(x) => {setSelectedRows(x.map(item=>rows.find(obj=>obj.id===Number(item))))}}
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