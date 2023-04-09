import React, { useState } from 'react'
import { AppBar, Toolbar, Button, TextField, FormControl, FormControlLabel, RadioGroup, Radio, IconButton, Tooltip, CircularProgress } from '@mui/material';
import Content from "./content"
import './style.css'
import { Upload, Download } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux';
import { fetchConfig, fetchFile } from './actions';
import {
    setFreedomDegrees,
    setOrder,
    setConstsType,
    setOmegas,
    setConsts,
    setDipoleX,
    setDipoleY,
    setDipoleZ
} from '../../../store/redusers';

const CalculationPage = () => {

    const dispatch = useDispatch()

    const state = useSelector(state => state.data)
    const http = useSelector(state => state.http)

    console.log(state, http)

    const [fileName, setFileName] = useState('')

    const emptyNumbers1 = [undefined, ''].some(item => state.numbers1.map(el => el.value).includes(item))
    const emptyNumbers2 = [undefined, ''].some(item => state.numbers2.map(el => el.value).includes(item))
    const emptyOmegas = [undefined, ''].some(item => state.omegas.map(el => el.value).includes(item))
    const emptyConsts = [undefined, ''].some(item => state.consts.map(el => el.value).includes(item))

    const someEmpty = emptyNumbers1 || emptyNumbers2 || emptyOmegas || emptyConsts

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

            console.log(e.target.files[0].name, fileName)

            setFileName(e.target.files[0].name)

            let objFreedomDegrees = event.target.result.split('\n').filter(item => item.includes('number_of_vibrational_degrees'))[0].trim().split('=')[1]

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
                            value={state.freedomDegrees}
                            style={{ margin: 10, width: 130 }}
                            label={'Степени свободы'}
                            size='small'
                            onChange={e => dispatch(setFreedomDegrees(e.target.value))}
                        />

                        <TextField
                            value={state.order}
                            style={{ margin: 10, width: 80 }}
                            label={'Порядок'}
                            size='small'
                            onChange={e => dispatch(setOrder(e.target.value))}
                        />

                        <div>
                            <div className='radio-label'>Тип констант</div>
                            <FormControl style={{ marginLeft: 10, padding: '0 10px', border: '1px solid #c4c4c4', borderRadius: 4, }}>
                                <RadioGroup
                                    row
                                    value={state.constsType}
                                    onChange={e => dispatch(setConstsType(e.target.value))}
                                >
                                    <FormControlLabel style={{ color: '#0E76BB' }} value="A" control={<Radio size='small' />} label="a" />
                                    <FormControlLabel style={{ color: '#0E76BB' }} value="k" control={<Radio size='small' />} label="k" />
                                    <FormControlLabel style={{ color: '#0E76BB' }} value="fi" control={<Radio size='small' />} label={<span>&phi;</span>} />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>

                    <div className='buttons'>

                        <Button
                            endIcon={http.loadingConfig ? <CircularProgress size={20} /> : ''}
                            onClick={() => fetchConfig(dispatch, state)}
                            variant={"outlined"}
                            style={{ background: 'white', margin: 10 }}
                            disabled={http.loadingConfig}
                        >
                            Параметры
                        </Button>

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
                            <IconButton onClick={()=>fetchFile(state)} color="primary" component="label">
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