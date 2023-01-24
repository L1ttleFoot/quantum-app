import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import '../../style.css'
import {TextField, Stack, Typography} from '@mui/material'
import { UsePage } from '../../../../../store/redusers';

const StateField = (props) => {

    const dispatchHelpers = UsePage()

    const state = useSelector(state=>state)

    const {numbers1, numbers2, freedomDegrees} = state

    const {
        dispatchNumbers1,
        dispatchNumbers2,
    } = dispatchHelpers

    const letterIndexes='ijkl'

    useEffect(
        () => {
            dispatchNumbers1(new Array(Number(freedomDegrees)).fill(undefined).map((item, index)=>({var: 'number', index: index+1, value: '', letIndex: letterIndexes[index]})))
            dispatchNumbers2(new Array(Number(freedomDegrees)).fill(undefined).map((item, index)=>({var: 'number', index: index+1, value: '', letIndex: letterIndexes[index]})))
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [freedomDegrees],
    );

    const handleChangeNumbers1 = index => event => {
        const newNumbers1 = numbers1.map((item, indexItem) => index===indexItem ? ({...item, value:event.target.value}):item)
        dispatchNumbers1(newNumbers1)
    };

    const handleChangeNumbers2 = index => event => {
        const newNumbers2 = numbers2.map((item, indexItem) => index===indexItem ? ({...item, value:event.target.value}):item)
        dispatchNumbers2(newNumbers2)
    };

    return(
        <div className='stateField'>
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
                            onChange={handleChangeNumbers1(index)}
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
        </div>
    )
}

export default StateField