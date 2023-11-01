import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, TextField, IconButton, Tooltip } from '@mui/material';
import Content from "./content"
import './style.css'
import { Upload, Download } from '@mui/icons-material'
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../helpers/hooks/useTypedSelector';
import { fetchConfig, fetchFile } from './requests';
import {
    setFreedomDegrees,
    setOrder,
    setConstsType,
    setOmegas,
    setConsts,
    setDipoleX,
    setDipoleY,
    setDipoleZ
} from './slice';
import ConstTypeSelect from './components/ConstTypeSelect';

const CalculationPage = () => {

    const dispatch = useDispatch()

    const data = useTypedSelector(state => state.data)

    const {freedomDegrees, order} = data

    const [fileName, setFileName] = useState('')
    const [loadFromFile, setLoadFromFile] = useState(false)

    useEffect(()=>{

        if (loadFromFile) return

        dispatch(fetchConfig({freedomDegrees, order}))
        // eslint-disable-next-line
    }, [dispatch, freedomDegrees, order])

    const emptyOmegas = [undefined, ''].some(item => data.omegas.map(el => el.value).includes(item))
    const emptyConsts = [undefined, ''].some(item => data.consts.map(el => el.value).includes(item))

    const someEmpty = emptyOmegas || emptyConsts

    const letterIndexes = 'ijkl'

    const numberIndex = {
        'i': '1',
        'j': '2',
        'k': '3',
        'f': '4',
    }

    const onChange = (e) => {

        let reader = new FileReader()

        reader.onload = function (event) {

            setFileName(e.target.files[0].name)

            setLoadFromFile(true)

            let objFreedomDegrees = reader.result.split('\n').filter(item => item.includes('number_of_vibrational_degrees'))[0].trim().split('=')[1]

            let objOrder = event.target.result.split('\n').filter(item => item.includes('max_indignation'))[0].trim().split('=')[1]

            let objConstType = event.target.result.split('\n').filter(item => item.includes('type_anharmonic_const'))[0].trim().split('=')[1].replace(/["']/g, '')

            let objOmegas = JSON.parse(event.target.result.split('\n').filter(item => item.includes('const_omega'))[0].trim().split('=')[1].replace(/omega_[a-z]/g, x => `"${x}"`))

            let objConsts = JSON.parse(event.target.result.split('\n').filter(item => item.includes('const_anharmonic'))[0].trim().split('=')[1].replace(/A_[a-z]{0,4}/g, x => `"${x}"`))

            let objDipoleX = JSON.parse(event.target.result.split('\n').filter(item => item.includes('const_dipoleX_dict'))[0].trim().split('=')[1].replace(/D_[0-9,a-z]{0,4}/g, x => `"${x}"`))

            let objDipoleY = JSON.parse(event.target.result.split('\n').filter(item => item.includes('const_dipoleY_dict'))[0].trim().split('=')[1].replace(/D_[0-9,a-z]{0,4}/g, x => `"${x}"`))

            let objDipoleZ = JSON.parse(event.target.result.split('\n').filter(item => item.includes('const_dipoleZ_dict'))[0].trim().split('=')[1].replace(/D_[0-9,a-z]{0,4}/g, x => `"${x}"`))

            dispatch(setFreedomDegrees(objFreedomDegrees))

            dispatch(setOrder(parseInt(objOrder)))

            dispatch(setConstsType(objConstType))

            dispatch(setOmegas([...Object.values(objOmegas).map((item, index) => ({ var: 'number', index: index + 1, value: `${item}`, letIndex: letterIndexes[index] }))]))

            dispatch(setConsts([...Object.entries(objConsts).map(item => ({ var: 'const', index: item[0].split('_')[1].replace(/[i,j,k,l]/g, x => numberIndex[x]), value: `${item[1]}`, letIndex: item[0].split('_')[1] }))]))

            dispatch(setDipoleX([...Object.entries(objDipoleX).map(item => ({ var: 'const', index: item[0].split('_')[1].replace(/[i,j,k,l]/g, x => numberIndex[x]), value: `${item[1]}`, letIndex: item[0].split('_')[1] }))].slice(1)))

            dispatch(setDipoleY([...Object.entries(objDipoleY).map(item => ({ var: 'const', index: item[0].split('_')[1].replace(/[i,j,k,l]/g, x => numberIndex[x]), value: `${item[1]}`, letIndex: item[0].split('_')[1] }))].slice(1)))

            dispatch(setDipoleZ([...Object.entries(objDipoleZ).map(item => ({ var: 'const', index: item[0].split('_')[1].replace(/[i,j,k,l]/g, x => numberIndex[x]), value: `${item[1]}`, letIndex: item[0].split('_')[1] }))].slice(1)))

            setLoadFromFile(false)
        }

        reader.readAsText(e.target.files[0])
        //e.target.value = "";
    }

    const onClick = (e) => {
        e.target.value = '';
    }

    return (
        <div style={{ marginLeft: 60 }}>
            <AppBar style={{ background: 'white', width: `calc(100% - 60px)`, }}>
                <Toolbar style={{ display: 'flex' }}>

                    <div className='input'>

                        <TextField
                            value={freedomDegrees}
                            style={{ margin: 10, width: 130 }}
                            label={'Степени свободы'}
                            size='small'
                            onChange={e => dispatch(setFreedomDegrees(parseInt(e.target.value)))}
                        />

                        <TextField
                            value={order}
                            style={{ margin: 10, width: 80 }}
                            label={'Порядок'}
                            size='small'
                            onChange={e => dispatch(setOrder(parseInt(e.target.value)))}
                        />

                        <ConstTypeSelect/>

                    </div>

                    <div className='buttons'>

                        <Tooltip title="Загрузить файл" placement="bottom">
                            <IconButton onClick={onClick} color="primary" component="label">
                                <input
                                    onChange={onChange}
                                    accept="application/json,.py,.txt"
                                    type="file"
                                    hidden
                                />
                                <Upload />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Скачать файл" placement="bottom">
                            <IconButton onClick={()=>fetchFile(data)} color="primary" component="label">
                                <Download />
                            </IconButton>
                        </Tooltip>

                    </div>

                </Toolbar>
            </AppBar>

            <Content
                someEmpty={someEmpty}
            />

        </div>
    )
}

export default CalculationPage