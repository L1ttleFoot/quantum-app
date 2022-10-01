import React, {useState} from 'react'
import { AppBar, Toolbar, Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import MainPage from "./screens/main"

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
        fetch(`/api/v1/calculation`, {method: 'POST',  body: JSON.stringify({n:state.value1, omega:state.value2, const: state.value3})})
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
        })
    };

    const setNumbers = (value) => {
        dispatch({type:'SET_NUMBERS', payload:value.target.value})
    }

    const setOrder = (value) => {
        dispatch({type:'SET_ORDER', payload:value.target.value})
    }

    return(
        <div>
            <AppBar style={{background: 'white',position:'absolute'}}>
                <Toolbar>

                    <TextField value={state.numbers} style={{margin: 10}} label={'Степени свободы'} size='small' onChange={setNumbers}></TextField>

                    <TextField value={state.order} style={{margin: 10}} label={'Порядок'} size='small' onChange={setOrder}></TextField>

                    <Button 
                        onClick={handleClick} 
                        variant="outlined" 
                        style={{background: 'white', margin: 10}}
                    >
                        Задать параметры
                    </Button>
            
                    <Button onClick={handleClick1} variant="outlined" style={{background: 'white', margin: 10}}>Расчет</Button>
                    {/* <FormControl>
                        <FormLabel>const</FormLabel>
                        <RadioGroup
                        row
                        defaultValue="a"
                        >
                        <FormControlLabel value="a" control={<Radio />} label="a"/>
                        <FormControlLabel value="k" control={<Radio />} label="k" />
                        <FormControlLabel value="phi" control={<Radio />} label="phi" />
                        </RadioGroup>
                    </FormControl> */}
                </Toolbar>
            </AppBar>

            <MainPage state={state} frequencyList={frequencyList} constList={constList}/>

        </div>
    )
}

export default Main