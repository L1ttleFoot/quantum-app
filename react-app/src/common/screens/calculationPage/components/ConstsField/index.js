import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../style.css'
import { TextField, Typography } from '@mui/material'
import { setConsts } from '../../slice'
import { constsDict } from '../../consts'

const ConstsField = () => {

    const dispatch = useDispatch()

    const state = useSelector(state => state.data)

    const { consts } = state

    const handleChangeConst = index => event => {
        let newArr = consts.map(item=>({...item}))
        newArr[index].value = event.target.value
        dispatch(setConsts(newArr.map(item => ({ ...item, letIndex: item.index.replace(/1/g, 'i').replace(/2/g, 'j').replace(/3/g, 'k') }))))
    };

    console.log(constsDict[state.constsType])
    console.log(state.constsType)


    const phi = decodeURI('%CF%86')

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
                        label={<span>{constsDict[state.constsType]}<sub>{item.index}</sub></span>}
                        value={item.value}
                        onChange={handleChangeConst(index)}
                    />
                )}
            </div>
        </div>
    )
}

export default ConstsField