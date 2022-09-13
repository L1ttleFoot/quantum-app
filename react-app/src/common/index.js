import React, {useState} from 'react'
import { AppBar, Toolbar, Button, TextField, FormControl,FormLabel, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import MainPage from "./screens/main"

const Main = () => {

    const dispatch = useDispatch()

    const state = useSelector(state=>state)

    const [frequencyList,setFrequencyList] = useState([])
    const [constList,setConstList] = useState([])

    const handleClick = () => {
        fetch(`http://localhost:8080/api/v1/config?numbers=${state.numbers}&order=${state.order}`)
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            setConstList(data.const_list)
            setFrequencyList(data.frequency_list)
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

                    <TextField label={'Степени свободы'} size='small' onChange={setNumbers}></TextField>

                    <TextField label={'Порядок'} size='small' onChange={setOrder}></TextField>

                    <Button 
                        onClick={handleClick} 
                        variant="outlined" 
                        style={{background: 'white', margin:10}}
                    >
                            Задать параметры
                    </Button>
            
                    <Button variant="outlined" style={{background: 'white', margin:10}}>Рассчет</Button>
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