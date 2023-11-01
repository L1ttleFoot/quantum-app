import React from 'react'
import { useTypedSelector } from '../../../../../helpers/hooks/useTypedSelector'
import '../../style.css'
import { TextField, Typography } from '@mui/material'
import { constsDict } from '../../consts'
import { ErrorHandler } from '../../../../../components/Errorhandler'
import { useAction } from '../../slice/useAction'

const ConstsField = () => {

    const {setConsts} = useAction()

    const data = useTypedSelector(state => state.data)
    const http = useTypedSelector(state => state.http)

    if(http.statusConfig!==200){
        return <ErrorHandler code={http.statusConfig}/>
    }

    const { consts } = data

    const handleChangeConst = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let newArr = consts.map(item=>({...item}))
        newArr[index].value = event.target.value
        setConsts(newArr.map(item => ({ ...item, letIndex: item.index.replace(/1/g, 'i').replace(/2/g, 'j').replace(/3/g, 'k') })))
    };

    const currentConst = constsDict.find(item => item.value === data.constsType)?.label

    return (
        <div className='block'>
            <Typography variant='body1' component='span'>Силовые постоянные</Typography>
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
                        label={<span>{currentConst}<sub>{item.index}</sub></span>}
                        value={item.value}
                        onChange={handleChangeConst(index)}
                    />
                )}
            </div>
        </div>
    )
}

export default ConstsField