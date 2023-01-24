import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import '../../style.css'
import { TextField, Typography, Tabs, Tab } from '@mui/material'
import { UsePage } from '../../../../../store/redusers';

const DipoleField = (props) => {

    const dispatchHelpers = UsePage()

    const state = useSelector(state => state)

    const { dipole0, dipoleX, dipoleY, dipoleZ } = state

    const {
        dispatchDipole0,
        dispatchDipoleX,
        dispatchDipoleY,
        dispatchDipoleZ,
    } = dispatchHelpers

    const [tab, setTab] = useState('x')

    const onChangeTab = (e, value) => {
        setTab(value)
    }

    const handleChangeDipoleX = index => event => {
        let newArr = [...dipoleX]
        newArr[index].value = event.target.value
        dispatchDipoleX(newArr.map(item => ({ ...item, letIndex: item.index.replace(/1/g, 'i').replace(/2/g, 'j').replace(/3/g, 'k') })))
    };

    const handleChangeDipoleY = index => event => {
        let newArr = [...dipoleY]
        newArr[index].value = event.target.value
        dispatchDipoleY(newArr.map(item => ({ ...item, letIndex: item.index.replace(/1/g, 'i').replace(/2/g, 'j').replace(/3/g, 'k') })))
    };

    const handleChangeDipoleZ = index => event => {
        let newArr = [...dipoleZ]
        newArr[index].value = event.target.value
        dispatchDipoleZ(newArr.map(item => ({ ...item, letIndex: item.index.replace(/1/g, 'i').replace(/2/g, 'j').replace(/3/g, 'k') })))
    };

    const handleChangeDipole0 = (e) => {
        dispatchDipole0({ ...dipole0, value: e.target.value })
    }

    return (
        <div className='block'>
            <Typography variant="subtitle">Производные дипольного момента</Typography>

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