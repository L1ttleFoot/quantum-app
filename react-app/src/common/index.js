import React, {useState} from 'react'
import { AppBar, Toolbar, Button, TextField, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import MainPage from "./screens/main"
import './style.css'

const Main = () => {

    const dispatch = useDispatch()

    const state = useSelector(state=>state)

    const [frequencyList, setFrequencyList] = useState([])
    const [constList, setConstList] = useState([])

    const handleClick = () => {
        fetch(`/api/v1/config?numbers=${state.numbers}&order=${state.order}`)
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            setConstList(data.const_list)
            setFrequencyList(data.frequency_list)
        })
    };

    const handleClick1 = () => {
        fetch(`/api/v1/calculation`, {method: 'POST',  body: JSON.stringify({n:state.value1, omega: state.value2, const: state.value3, constType: state.constType})})
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
        })
    };

    const handleChange = (e) => {
        dispatch({type:'SET_CONST_TYPE', payload: e.target.value})
    }

    const setNumbers = (value) => {
        dispatch({type:'SET_NUMBERS', payload: value.target.value})
    }

    const setOrder = (value) => {
        dispatch({type:'SET_ORDER', payload: value.target.value})
    }

    const voidValue1 = [undefined, ''].some(item=>state.value1.map(el=>el.value).includes(item))
    const voidValue2 = [undefined, ''].some(item=>state.value2.map(el=>el.value).includes(item))
    const voidValue3 = [undefined, ''].some(item=>state.value3.map(el=>el.value).includes(item))

    return(
        <div>
            <AppBar style={{background: 'white', position:'absolute'}}>
                <Toolbar style={{display: 'flex', justifyContent: 'space-between' }}>
                    
                        <div className='fields'>

                            <TextField value={state.numbers} style={{margin: 10}} label={'Степени свободы'} size='small' onChange={setNumbers}></TextField>

                            <TextField value={state.order} style={{margin: 10}} label={'Порядок'} size='small' onChange={setOrder}></TextField>

                            <FormControl style={{marginLeft: 10}}>
                                <FormLabel>Тип констант</FormLabel>
                                <RadioGroup
                                    row
                                    defaultValue="A"
                                    onChange={(e)=>handleChange(e)}
                                >
                                    <FormControlLabel style={{color:'#0E76BB'}} value="A" control={<Radio />} label="a"/>
                                    <FormControlLabel style={{color:'#0E76BB'}} value="k" control={<Radio />} label="k" />
                                    <FormControlLabel style={{color:'#0E76BB'}} value="fi" control={<Radio />} label={<span>&phi;</span>}  />
                                </RadioGroup>
                            </FormControl> 

                        </div>

                        <div className='buttons'>

                            <Button 
                                onClick={handleClick} 
                                variant="outlined" 
                                style={{background: 'white', margin: 10}}
                            >
                                Задать параметры
                            </Button>
                    
                            <Button disabled={voidValue1 || voidValue2 || voidValue3} onClick={handleClick1} variant="outlined" style={{background: 'white', margin: 10}}>Расчет</Button>
                            
                        </div>

                 

                </Toolbar>
            </AppBar>

            <MainPage state={state} frequencyList={frequencyList} constList={constList}/>

        </div>
    )
}

export default Main