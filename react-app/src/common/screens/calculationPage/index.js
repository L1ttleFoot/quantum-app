import React, {useState, useReducer} from 'react'
import { AppBar, Toolbar, Button, TextField, FormControl, FormControlLabel, RadioGroup, Radio, IconButton, Tooltip } from '@mui/material';
import Content from "./content"
import './style.css'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import {initialState} from "../../initialState";
import {reducer} from "../../../store";

const CalculationPage = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const dispatchHelpers = {
        dispatchFreedomDegrees: (value) => dispatch({type:'SET_FREEDOM_DEGREES', payload: value}),
        dispatchOrder: (value) => dispatch({type:'SET_ORDER', payload: value}),
        dispatchConstsType: (value) => dispatch({type:'SET_CONSTS_TYPE', payload: value}),
        dispatchConsts: (value) => dispatch({type:'SET_CONSTS', payload: value}),
        dispatchOmegas: (value) => dispatch({type:'SET_OMEGAS', payload: value}),
        dispatchNumbers1: (value) => dispatch({type:'SET_NUMBERS1', payload: value}),
        dispatchNumbers2: (value) => dispatch({type:'SET_NUMBERS2', payload: value}),
        dispatchDipole0: (value) => dispatch({type:'SET_DIPOLE_0', payload: value}),
        dispatchDipoleX: (value) => dispatch({type:'SET_DIPOLE_X', payload: value}),
        dispatchDipoleY: (value) => dispatch({type:'SET_DIPOLE_Y', payload: value}),
        dispatchDipoleZ: (value) => dispatch({type:'SET_DIPOLE_Z', payload: value}),
        dispatchRows: (value) => dispatch({type:'SET_ROWS', payload: value}),
    }

    const [loading, setLoading] = useState(false)

    const [fileName, setFileName] = useState('')
    const [load, setLoad] = useState(false)

    const handleClickConfig = (props) => {

        props.setLoading(true)

        fetch(`https://quantum-app-bf8b.vercel.app/api/v1/config?freedomDegrees=${state.freedomDegrees}&order=${state.order}`)
        .then(response=>response.json())
        .then(data=>{
            dispatchHelpers.dispatchConsts(data.consts_list)
            //dispatchHelpers.dispatchOmegas(data.omegas_list)
            dispatchHelpers.dispatchDipoleX(data.dipole_list_x)
            dispatchHelpers.dispatchDipoleY(data.dipole_list_y)
            dispatchHelpers.dispatchDipoleZ(data.dipole_list_z)
        })

        props.setLoading(false)

    };

    const handleClickCalculation = async() => {
        setLoad(l=>!l)
        await fetch(`https://quantum-app-bf8b.vercel.app/api/v1/calculation`,
        {method: 'POST',
            body: JSON.stringify({
                numbers1: state.numbers1, 
                numbers2: state.numbers2, 
                omegas: state.omegas, 
                consts: state.consts, 
                dipoleX: [state.dipole0, ...state.dipoleX],
                dipoleY: [state.dipole0, ...state.dipoleY],
                dipoleZ: [state.dipole0, ...state.dipoleZ],
                constsType: state.constsType,
                order: state.order
        })})
        .then(response=>response.json())
        .then(data=>{
            dispatchHelpers.dispatchRows([...state.rows, data])
        })
        .catch(error => {
            console.log(error)
        });

        setLoad(l=>!l)

    };

    const emptyNumbers1 = [undefined, ''].some(item=>state.numbers1.map(el=>el.value).includes(item))
    const emptyNumbers2 = [undefined, ''].some(item=>state.numbers2.map(el=>el.value).includes(item))
    const emptyOmegas = [undefined, ''].some(item=>state.omegas.map(el=>el.value).includes(item))
    const emptyConsts = [undefined, ''].some(item=>state.consts.map(el=>el.value).includes(item))

    const someEmpty = emptyNumbers1 || emptyNumbers2 || emptyOmegas || emptyConsts

    const letterIndexes='ijkl'

    const numberIndex = {
        'i':'1',
        'j':'2',
        'k':'3',
        'f':'4',
    }

    const onChange = (e) => {
        
        let reader = new FileReader()

        reader.onload = function(event) {

            console.log(e.target.files[0].name, fileName)

            setFileName(e.target.files[0].name)

            let objFreedomDegrees = event.target.result.split('\n').filter(item=>item.includes('number_of_vibrational_degrees'))[0].trim().split('=')[1]

            let objOrder = event.target.result.split('\n').filter(item=>item.includes('max_indignation'))[0].trim().split('=')[1]

            let objConstType = event.target.result.split('\n').filter(item=>item.includes('type_anharmonic_const'))[0].trim().split('=')[1].replace(/["']/g,'')

            let objOmegas = JSON.parse(event.target.result.split('\n').filter(item=>item.includes('const_omega'))[0].trim().split('=')[1].replace(/omega_[a-z]/g, x=> `"${x}"`))
        
            let objConsts = JSON.parse(event.target.result.split('\n').filter(item=>item.includes('const_anharmonic'))[0].trim().split('=')[1].replace(/A_[a-z]{0,4}/g, x=> `"${x}"`))

            let objDipoleX = JSON.parse(event.target.result.split('\n').filter(item=>item.includes('const_dipoleX_dict'))[0].trim().split('=')[1].replace(/D_[0-9,a-z]{0,4}/g, x=> `"${x}"`))

            let objDipoleY = JSON.parse(event.target.result.split('\n').filter(item=>item.includes('const_dipoleY_dict'))[0].trim().split('=')[1].replace(/D_[0-9,a-z]{0,4}/g, x=> `"${x}"`))

            let objDipoleZ = JSON.parse(event.target.result.split('\n').filter(item=>item.includes('const_dipoleZ_dict'))[0].trim().split('=')[1].replace(/D_[0-9,a-z]{0,4}/g, x=> `"${x}"`))

            dispatchHelpers.dispatchFreedomDegrees(objFreedomDegrees)

            dispatchHelpers.dispatchOrder(parseInt(objOrder))

            dispatchHelpers.dispatchConstsType(objConstType)

            dispatchHelpers.dispatchOmegas([...Object.values(objOmegas).map((item, index)=>({var: 'number', index: index+1, value: `${item}`, letIndex: letterIndexes[index]}))])

            dispatchHelpers.dispatchConsts([...Object.entries(objConsts).map(item=>({var:'const', index: item[0].split('_')[1].replace(/[i,j,k,l]/g, x=>numberIndex[x]), value: `${item[1]}`, letIndex: item[0].split('_')[1]}))])

            dispatchHelpers.dispatchDipoleX([...Object.entries(objDipoleX).map(item=>({var:'const', index: item[0].split('_')[1].replace(/[i,j,k,l]/g, x=>numberIndex[x]), value: `${item[1]}`, letIndex: item[0].split('_')[1]}))].slice(1))

            dispatchHelpers.dispatchDipoleY([...Object.entries(objDipoleY).map(item=>({var:'const', index: item[0].split('_')[1].replace(/[i,j,k,l]/g, x=>numberIndex[x]), value: `${item[1]}`, letIndex: item[0].split('_')[1]}))].slice(1))

            dispatchHelpers.dispatchDipoleZ([...Object.entries(objDipoleZ).map(item=>({var:'const', index: item[0].split('_')[1].replace(/[i,j,k,l]/g, x=>numberIndex[x]), value: `${item[1]}`, letIndex: item[0].split('_')[1]}))].slice(1))

        }
        
        reader.readAsText(e.target.files[0])
        //e.target.value = "";
    }

    const onClick = (e) => {
        e.target.value = '';
    }

    return(
        <div style={{marginLeft: 60}}>
            <AppBar style={{background: 'white', width: `calc(100% - 60px)`, }}>
                <Toolbar style={{display: 'flex'}}>
                    
                    <div className='input'>

                        <TextField
                            value={state.freedomDegrees}
                            style={{margin: 10, width: 130}}
                            label={'Степени свободы'}
                            size='small'
                            onChange={e=>dispatchHelpers.dispatchFreedomDegrees(e.target.value)}
                        />

                        <TextField
                            value={state.order}
                            style={{margin: 10, width: 80}}
                            label={'Порядок'}
                            size='small'
                            onChange={e=>dispatchHelpers.dispatchOrder(e.target.value)}
                        />

                        <div>
                            <div className='radio-label'>Тип констант</div>
                            <FormControl style={{marginLeft: 10, padding: '0 10px', border: '1px solid #c4c4c4', borderRadius: 4,}}>
                                <RadioGroup
                                    row
                                    value={state.constsType}
                                    onChange={e=>dispatchHelpers.dispatchConstsType(e.target.value)}
                                >
                                    <FormControlLabel style={{color:'#0E76BB'}} value="A" control={<Radio size='small' />} label="a"/>
                                    <FormControlLabel style={{color:'#0E76BB'}} value="k" control={<Radio size='small' />} label="k" />
                                    <FormControlLabel style={{color:'#0E76BB'}} value="fi" control={<Radio size='small' />} label={<span>&phi;</span>}  />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>

                    <div className='buttons'>

                        <Button
                            onClick={()=>handleClickConfig({setLoading})}
                            variant={"outlined"}
                            style={{background: 'white', margin: 10}}
                            disabled={loading}
                        >
                            Параметры
                        </Button>

                        <Tooltip title="Загрузить файл" placement="right">
                            <IconButton onClick={onClick} color="primary" component="label">
                                <input
                                    onChange={onChange}
                                    accept="application/json,.py,.txt"
                                    type="file"
                                    hidden
                                />
                                <UploadFileIcon/>
                            </IconButton>
                        </Tooltip>
                    </div>

                </Toolbar>
            </AppBar>

            <Content
                state = {state}
                dispatchHelpers = {dispatchHelpers}
                calculation = {handleClickCalculation}
                someEmpty = {someEmpty}
                load = {load}
            />

        </div>
    )
}

export default CalculationPage