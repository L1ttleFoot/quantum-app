import React from 'react'
import { useSelector } from 'react-redux'
import '../../style.css'
import { TextField, Typography } from '@mui/material'
import { UsePage } from '../../../../../store/redusers';


const ConstsField = (props) => {

    const dispatchHelpers = UsePage()

    const state = useSelector(state => state)

    const { consts } = state

    const {
        dispatchConsts,
    } = dispatchHelpers


    const handleChangeConst = index => event => {
        let newArr = [...consts]
        newArr[index].value = event.target.value
        dispatchConsts(newArr.map(item => ({ ...item, letIndex: item.index.replace(/1/g, 'i').replace(/2/g, 'j').replace(/3/g, 'k') })))
    };

    return (
        <div className='block'>
            <Typography variant="subtitle">Силовые постоянные</Typography>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}
            >

                {consts.map((item, index) =>
                    <TextField
                        key={item.index + 'const'}
                        size={'small'}
                        style={{ margin: 10, width: '15%', minWidth: 80 }}
                        label={<span>a<sub>{item.index}</sub></span>}
                        value={item.value}
                        onChange={handleChangeConst(index)}
                    />
                )}

            </div>
        </div>
    )
}

export default ConstsField