import React, { useState } from 'react'
import { useTypedSelector } from '../../../../../helpers/hooks/useTypedSelector'
import '../../style.css'
import { TextField, Typography, Tabs, Tab } from '@mui/material'
import { ErrorHandler } from '../../../../../components/Errorhandler'
import { useAction } from '../../slice/useAction'

const DipoleField = () => {

    const {setDipole0, setDipoleX, setDipoleY, setDipoleZ} = useAction()

    const data = useTypedSelector(state => state.data)
    const http = useTypedSelector(state => state.http)

    const [tab, setTab] = useState('x')

    if(http.statusConfig!==200){
        return <ErrorHandler code={http.statusConfig}/>
    }

    const { dipole0, dipoleX, dipoleY, dipoleZ } = data

    const onChangeTab = (event: React.SyntheticEvent, value: string) => {
        setTab(value)
    }

    const handleChangeDipoleX = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let newArr = [...dipoleX]
        newArr[index].value = event.target.value
        setDipoleX(newArr.map(item => ({ ...item, letIndex: item.index.replace(/1/g, 'i').replace(/2/g, 'j').replace(/3/g, 'k') })))
    };

    const handleChangeDipoleY = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let newArr = [...dipoleY]
        newArr[index].value = event.target.value
        setDipoleY(newArr.map(item => ({ ...item, letIndex: item.index.replace(/1/g, 'i').replace(/2/g, 'j').replace(/3/g, 'k') })))
    };

    const handleChangeDipoleZ = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let newArr = [...dipoleZ]
        newArr[index].value = event.target.value
        setDipoleZ(newArr.map(item => ({ ...item, letIndex: item.index.replace(/1/g, 'i').replace(/2/g, 'j').replace(/3/g, 'k') })))
    };

    const handleChangeDipole0 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDipole0({ ...dipole0, value: e.target.value })
    }

    return (
        <div className='block'>
            <Typography variant="body1" component='span'>Производные дипольного момента</Typography>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Tabs value={tab} onChange={onChangeTab} variant="fullWidth">
                    <Tab label="X" value="x" />
                    <Tab label="Y" value="y" />
                    <Tab label="Z" value="z" />
                </Tabs>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}
            >

                <TextField
                    key={'dipole0'}
                    size={'small'}
                    style={{ margin: 10, width: '20%', minWidth: 80 }}
                    label={<span>d<sub>0</sub></span>}
                    value={dipole0.value}
                    onChange={handleChangeDipole0}
                />

                {tab === 'x' && dipoleX.map((item, index) =>
                    <TextField
                        key={item.index + 'dipoleY'}
                        size={'small'}
                        style={{ margin: 10, width: '20%', minWidth: 80 }}
                        label={<span>d<sub>{item.index}</sub></span>}
                        value={item.value}
                        onChange={handleChangeDipoleX(index)}
                    />
                )}

                {tab === 'y' && dipoleY.map((item, index) =>
                    <TextField
                        key={item.index + 'dipoleY'}
                        size={'small'}
                        style={{ margin: 10, width: '20%', minWidth: 80 }}
                        label={<span>d<sub>{item.index}</sub></span>}
                        value={item.value}
                        onChange={handleChangeDipoleY(index)}
                    />
                )}

                {tab === 'z' && dipoleZ.map((item, index) =>
                    <TextField
                        key={item.index + 'dipoleZ'}
                        size={'small'}
                        style={{ margin: 10, width: '20%', minWidth: 80 }}
                        label={<span>d<sub>{item.index}</sub></span>}
                        value={item.value}
                        onChange={handleChangeDipoleZ(index)}
                    />
                )}

            </div>
        </div>
    )
}

export default DipoleField