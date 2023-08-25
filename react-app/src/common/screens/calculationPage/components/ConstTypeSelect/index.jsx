import React from 'react'
import { FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setConstsType } from '../../slice';

const ConstTypeSelect = () => {

    const dispatch = useDispatch()

    const data = useSelector(state => state.data)

    return (
        <div>
            <div className='radio-label'>Тип констант</div>
            <FormControl style={{ marginLeft: 10, padding: '0 10px', border: '1px solid #c4c4c4', borderRadius: 4, }}>
                <RadioGroup
                    row
                    value={data.constsType}
                    onChange={e => dispatch(setConstsType(e.target.value))}
                >
                    <FormControlLabel style={{ color: '#0E76BB' }} value="A" control={<Radio size='small' />} label="a" />
                    <FormControlLabel style={{ color: '#0E76BB' }} value="k" control={<Radio size='small' />} label="k" />
                    <FormControlLabel style={{ color: '#0E76BB' }} value="fi" control={<Radio size='small' />} label={<span>&phi;</span>} />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default ConstTypeSelect
