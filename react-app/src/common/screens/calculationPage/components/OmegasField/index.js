import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import '../../style.css'
import {TextField, Stack, Typography} from '@mui/material'
import { UsePage } from '../../../../../store/redusers';

const OmegasField = (props) => {

    const dispatchHelpers = UsePage()

    const state = useSelector(state=>state)

    const {omegas, freedomDegrees} = state

    const {
        
        dispatchOmegas,
    } = dispatchHelpers


    const letterIndexes='ijkl'

    useEffect(
        () => {
            dispatchOmegas(new Array(Number(freedomDegrees)).fill(undefined).map((item, index)=>({var: 'omega', index: index+1, value: '', letIndex: letterIndexes[index]})))
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [freedomDegrees],
    );
    
    const handleChangeOmegas = index => event => {
        const newOmegas = omegas.map((item, indexItem)=> index===indexItem ? ({...item, value:event.target.value}):item)
        dispatchOmegas(newOmegas)
    };

    return(
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
    )
}

export default OmegasField