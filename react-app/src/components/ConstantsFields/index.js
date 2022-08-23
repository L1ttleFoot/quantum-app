import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {TextField, Paper, Stack } from '@mui/material'

const Field = (props) => {

    const dispatch = useDispatch()

    const setValue = (value) => {
        dispatch({type:'SET_VALUE1', payload :value})
    }

    const value1 = useSelector(state=>state.value1)
    
    const handleChange = index => event => {
        let newArr=[...value1]
        newArr[index].value=event.target.value
        newArr[index].index=index
        setValue(newArr)
    };

    return (

        <Paper className={props.class}>
            <Stack direction={'column'} alignItems={'center'}>
                {value1.map((item,index)=>
                    <TextField 
                        key={item.index +`-${props.label}`} 
                        size={'small'} 
                        style={{margin:15}} 
                        label={`${decodeURI('%CF%89')}${item.index || ''}`} 
                        value={item.value} 
                        onChange={handleChange(index)}
                    />
                )}
            </Stack>
        </Paper>

    )

}

export default Field