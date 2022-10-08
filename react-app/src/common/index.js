import React, {useState} from 'react'
import { AppBar, Toolbar, Button, TextField, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import MainPage from "./screens/main"
import './style.css'

const Main = () => {

    const dispatch = useDispatch()

    const state = useSelector(state=>state)

    const [omegasList, setOmegasList] = useState([])
    const [constsList, setConstsList] = useState([])

    const setRows = (value) => {
        dispatch({type:'SET_ROWS', payload: value})
    }

    const handleClickConfig = () => {
        fetch(`/api/v1/config?freedomDegrees=${state.freedomDegrees}&order=${state.order}`)
        .then(response=>response.json())
        .then(data=>{
            setConstsList(data.consts_list)
            setOmegasList(data.omegas_list)
        })
    };

    const handleClickCalculation = () => {
        fetch(`/api/v1/calculation`, 
        {   method: 'POST',  
            body: JSON.stringify({
                numbers1: state.numbers1, 
                numbers2: state.numbers2, 
                omegas: state.omegas, 
                consts: state.consts, 
                constsType: state.constsType
        })})
        .then(response=>response.json())
        .then(data=>{
            setRows([...state.rows, data])
        })
        .catch(error => {
            console.log(error)
        });
    };

    const setConstsType = (e) => {
        dispatch({type:'SET_CONSTS_TYPE', payload: e.target.value})
    }

    const setFreedomDegrees = (value) => {
        dispatch({type:'SET_FREEDOM_DEGREES', payload: value.target.value})
    }

    const setOrder = (value) => {
        dispatch({type:'SET_ORDER', payload: value.target.value})
    }

    const voidNumbers1 = [undefined, ''].some(item=>state.numbers1.map(el=>el.value).includes(item))
    const voidNumbers2 = [undefined, ''].some(item=>state.numbers2.map(el=>el.value).includes(item))
    const voidOmegas = [undefined, ''].some(item=>state.omegas.map(el=>el.value).includes(item))
    const voidConsts = [undefined, ''].some(item=>state.consts.map(el=>el.value).includes(item))

    return(
        <div>
            <AppBar style={{background: 'white', position:'absolute'}}>
                <Toolbar style={{display: 'flex', justifyContent: 'space-between' }}>
                    
                        <div className='input'>

                            <TextField value={state.freedomDegrees} style={{margin: 10, width: 130}} label={'Степени свободы'} size='small' onChange={setFreedomDegrees}></TextField>

                            <TextField value={state.order} style={{margin: 10, width: 80}} label={'Порядок'} size='small' onChange={setOrder}></TextField>

                            <FormControl style={{marginLeft: 10}}>
                                <FormLabel>Тип констант</FormLabel>
                                <RadioGroup
                                    row
                                    defaultValue="A"
                                    onChange={(e)=>setConstsType(e)}
                                >
                                    <FormControlLabel style={{color:'#0E76BB'}} value="A" control={<Radio />} label="a"/>
                                    <FormControlLabel style={{color:'#0E76BB'}} value="k" control={<Radio />} label="k" />
                                    <FormControlLabel style={{color:'#0E76BB'}} value="fi" control={<Radio />} label={<span>&phi;</span>}  />
                                </RadioGroup>
                            </FormControl> 

                        </div>

                        <div className='buttons'>

                            <Button 
                                onClick={handleClickConfig} 
                                variant={"outlined"}
                                style={{background: 'white', margin: 10}}
                            >
                                Задать параметры
                            </Button>
                    
                            <Button disabled={voidNumbers1 || voidNumbers2 || voidOmegas || voidConsts} onClick={handleClickCalculation} variant="outlined" style={{background: 'white', margin: 10}}>Расчет</Button>
                            
                        </div>

                </Toolbar>
            </AppBar>

            <MainPage state={state} frequencyList={omegasList} constsList={constsList}/>

        </div>
    )
}

export default Main