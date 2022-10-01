import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import './style.css'
import {TextField, Paper, Stack} from '@mui/material'

//import { DataGrid } from '@mui/x-data-grid';
//import Chart from "../../../components/Charts"
//import Field from "../components/ConstantsFields"

const Page = (props) => {

/* {n_i: 0, n_j: 0, n_k: 0,
    A_iii: 15.556, A_iij: -6.718, A_iik: 0, A_ijj: -4.243,A_ijk: 0,A_ikk: 56.215,A_jjj: -2.475,A_jjk: 0,A_jkk: 1.662,A_kkk: 0,
    A_iiii: 0.45, A_iiij: 0, A_iiik: 0, A_iijj: -0.775, A_iijk: 0, A_iikk: 3.75, A_ijjj: 0, A_ijjk: 0, A_ijkk: 0, A_ikkk: 0, A_jjjj: -0.35, A_jjjk: 0, A_jjkk: -1.625, A_jkkk: 0, A_kkkk: 0.75,
    D_0: 0, D_i: 0, D_j: 0, D_k: 0, D_ii: 0, D_ij: 0, D_ik: 0, D_jj: 0, D_jk: 0, D_kk: 0,
    omega_i: 1171, omega_j: 525, omega_k: 1378
} */

    const dispatch = useDispatch()

    const {state, constList} = props

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

    const [value1,setValue1] = useState([{value:2309,index:'1'}])
    const [value2,setValue2] = useState([{value:-0.095,index:'1,1,1'},{value:0.0103,index:'1,1,1,1'},{value:0,index:'1,1,1,1,1'}])
    const [value3,setValue3] = useState([{value:0.445,index:'0'},{value:-0.00552,index:'1'},{value:0.00568,index:'1,1'},{value:-0.00505,index:'1,1,1'}])
   
    const [selectedRows, setSelectedRows] = useState([])

    const handleChange3 = index => event => {
        let newArr=[...value3]
        newArr[index].value=event.target.value
        setValue3(newArr);
    };

    const letterIndexes='ijkl'

    const stateArr = new Array(Number(state.numbers)).fill(undefined).map((item, index)=>({var: 'n', index: index+1, value: '', letIndex: letterIndexes[index]}))
    const frequencyArr = new Array(Number(state.numbers)).fill(undefined).map((item, index)=>({var: 'omega', index: index+1, value: '', letIndex: letterIndexes[index]}))
    const constArr = [...constList]

    const [stateList, setStateList] = useState([])
    const [frequencyList, setFrequencyList] = useState([])
    const [newConstList,setNewConstList] = useState([])

    const setState = (value) => {
        dispatch({type:'SET_VALUE1', payload:value})    
    }

    const setFrequency = (value) => {
        dispatch({type:'SET_VALUE2', payload:value})    
    }

    const setConst = (value) => {
        dispatch({type:'SET_VALUE3', payload:value})    
    }

    useEffect(
        () => {
            setStateList(stateArr)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [state.numbers],
    );

    useEffect(
        () => {
            setFrequencyList(frequencyArr)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [state.numbers],
    );

    const handleChangeState = index => event => {
        let newArr=[...stateList]
        newArr[index].value=event.target.value
        setState(newArr)
    };

    const handleChangeFrequency = index => event => {
        let newArr=[...frequencyList]
        newArr[index].value=event.target.value
        setFrequency(newArr)
    };

    const handleChangeConst = index => event => {
        let newArr=[...constArr]
        newArr[index].value=event.target.value
        setConst(newArr.map(item=>({...item, letIndex: item.index.replace(/1/g,'i').replace(/2/g,'j').replace(/3/g,'k')})))
    };

    return(
        <div className={'container'}>

            <Paper className={'box1'}>
                <Stack direction={'column'} alignItems={'center'}>
                    {stateList.map((item,index)=>
                        <TextField 
                            key={item.index+'omega'} 
                            size={'small'} 
                            style={{margin:15}} 
                            label={<span>n<sub>{item.index}</sub></span>} 
                            value={item.value}
                            onChange={handleChangeState(index)}
                        />
                    )}
                </Stack>
            </Paper>

            <Paper className={'box2'}>
                <Stack direction={'column'} alignItems={'center'}>
                    {/* {value1.map((item,index)=>
                        <TextField key={item.index +'-omega'} size={'small'} style={{margin:15}} label={<span>{decodeURI('%CF%89')}<sub>{item.index}</sub></span>} value={item.value} onChange={handleChange1(index)}/>
                    )} */}

                   {/*  {Object.entries(frequencyList).map(([key,value], index)=>
                        <TextField key={key+' value'} size={'small'} style={{margin:15}} label={key} value={value} />
                    )} */}

                    {frequencyList.map((item, index)=>
                        <TextField 
                            key={item.index+'omega'} 
                            size={'small'} 
                            style={{margin:15}} 
                            label={<span>{decodeURI('%CF%89')}<sub>{item.index}</sub></span>} 
                            value={item.value}
                            onChange={handleChangeFrequency(index)}
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
                    {/* {value2.map((item,index) => 
                        <TextField key={item.index +'-k'} size={'small'} style={{margin:15}} label={'k '+item.index} value={item.value} onChange={handleChange2(index)}/>
                    )} */}

                    {/* {Object.entries(constList).map(([key,value], index)=>
                        <TextField key={key+' value'} size={'small'} style={{margin:15}} label={key} value={value} />
                    )} */}

                    {constArr.map((item, index)=>
                        <TextField
                            key={item.index+'const'}
                            size={'small'} 
                            style={{margin:15, width:'40%'}} 
                            label={<span>a<sub>{item.index}</sub></span>} 
                            value={item.value}
                            onChange={handleChangeConst(index)}
                        />
                    )}

                </div>
            </Paper>

            <Paper className={'box4'}>
                <Stack direction={'column'} alignItems={'center'}>
                    {value3.map((item,index) => 
                        <TextField 
                            key={item.index +'-d'} 
                            size={'small'} 
                            style={{margin:15}} 
                            label={'d '+item.index} 
                            value={item.value} 
                            onChange={handleChange3(index)}
                        />
                    )}
                </Stack>
            </Paper>

            {/* <Paper className={'box4'}>
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

            <Paper className={'box5'}>
                <Chart data={selectedRows}/>
            </Paper> */}

        </div>
    )
}

export default Page