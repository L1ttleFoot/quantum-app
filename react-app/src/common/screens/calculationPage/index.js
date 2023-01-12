import React, {useState, useEffect} from 'react'
import { AppBar, Toolbar, Button, TextField, FormControl, FormControlLabel, RadioGroup, Radio, IconButton, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Content from "./content"
import './style.css'
import UploadFileIcon from '@mui/icons-material/UploadFile';

const CalculationPage = () => {

    const dispatch = useDispatch()

    const state = useSelector(state=>state)

    const [omegasList, setOmegasList] = useState([])
    const [constsList, setConstsList] = useState([])
    const [dipoleXList, setDipoleXList] = useState([])
    const [dipoleYList, setDipoleYList] = useState([])
    const [dipoleZList, setDipoleZList] = useState([])

    const [loading, setLoading] = useState(false)

    const [fileName, setFileName] = useState('')
    const [load, setLoad] = useState(false)

    const setRows = (value) => {
        dispatch({type:'SET_ROWS', payload: value})
    }

    const handleClickConfig = (props) => {

        props.setLoading(true)

        fetch(`https://quantum-app-bf8b.vercel.app/api/v1/config?freedomDegrees=${state.freedomDegrees}&order=${state.order}`)
        .then(response=>response.json())
        .then(data=>{
            setConstsList(data.consts_list)
            setOmegasList(data.omegas_list)
            setDipoleXList(data.dipole_list_x)
            setDipoleYList(data.dipole_list_y)
            setDipoleZList(data.dipole_list_z)
        })

        props.setLoading(false)

    };

    const handleClickCalculation = async() => {
        setLoad(l=>!l)
        await fetch(`https://quantum-app-bf8b.vercel.app/api/v1/calculation`,
        {   method: 'POST',  
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
            setRows([...state.rows, data])
        })
        .catch(error => {
            console.log(error)
        });

        setLoad(l=>!l)

    };

    const setConstsType = (e) => {
        dispatch({type:'SET_CONSTS_TYPE', payload: e.target.value})
    }

    const setFreedomDegrees = (e) => {
        dispatch({type:'SET_FREEDOM_DEGREES', payload: e.target.value})
    }

    const setOrder = (e) => {
        dispatch({type:'SET_ORDER', payload: e.target.value})
    }

    const setOmegas = (value) => {
        dispatch({type:'SET_OMEGAS', payload: value})
    }

    const setConsts = (value) => {
        dispatch({type:'SET_CONSTS', payload: value})
    }

    const setDipoleX = (value) => {
        dispatch({type:'SET_DIPOLE_X', payload: value})
    }

    const setDipoleY = (value) => {
        dispatch({type:'SET_DIPOLE_Y', payload: value})
    }

    const setDipoleZ = (value) => {
        dispatch({type:'SET_DIPOLE_Z', payload: value})
    }

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

            console.log(e.target.files[0].name)

            setFileName(e.target.files[0].name)

            let objFreedomDegrees = event.target.result.split('\n').filter(item=>item.includes('number_of_vibrational_degrees'))[0].trim().split('=')[1]

            let objOrder = event.target.result.split('\n').filter(item=>item.includes('max_indignation'))[0].trim().split('=')[1]

            let objConstType = event.target.result.split('\n').filter(item=>item.includes('type_anharmonic_const'))[0].trim().split('=')[1].replace(/["']/g,'')

            let objOmegas = JSON.parse(event.target.result.split('\n').filter(item=>item.includes('const_omega'))[0].trim().split('=')[1].replace(/omega_[a-z]/g, x=> `"${x}"`))
        
            let objConsts = JSON.parse(event.target.result.split('\n').filter(item=>item.includes('const_anharmonic'))[0].trim().split('=')[1].replace(/A_[a-z]{0,4}/g, x=> `"${x}"`))

            let objDipoleX = JSON.parse(event.target.result.split('\n').filter(item=>item.includes('const_dipoleX_dict'))[0].trim().split('=')[1].replace(/D_[0-9,a-z]{0,4}/g, x=> `"${x}"`))

            let objDipoleY = JSON.parse(event.target.result.split('\n').filter(item=>item.includes('const_dipoleY_dict'))[0].trim().split('=')[1].replace(/D_[0-9,a-z]{0,4}/g, x=> `"${x}"`))

            let objDipoleZ = JSON.parse(event.target.result.split('\n').filter(item=>item.includes('const_dipoleZ_dict'))[0].trim().split('=')[1].replace(/D_[0-9,a-z]{0,4}/g, x=> `"${x}"`))

            dispatch({type:'SET_FREEDOM_DEGREES', payload: parseInt(objFreedomDegrees)})

            dispatch({type:'SET_ORDER', payload: parseInt(objOrder)})

            dispatch({type:'SET_CONSTS_TYPE', payload: objConstType})

            setOmegas([...Object.values(objOmegas).map((item, index)=>({var: 'number', index: index+1, value: `${item}`, letIndex: letterIndexes[index]}))])

            setConsts([...Object.entries(objConsts).map(item=>({var:'const', index: item[0].split('_')[1].replace(/[i,j,k,l]/g, x=>numberIndex[x]), value: `${item[1]}`, letIndex: item[0].split('_')[1]}))])

            setDipoleX([...Object.entries(objDipoleX).map(item=>({var:'const', index: item[0].split('_')[1].replace(/[i,j,k,l]/g, x=>numberIndex[x]), value: `${item[1]}`, letIndex: item[0].split('_')[1]}))].slice(1))

            setDipoleY([...Object.entries(objDipoleY).map(item=>({var:'const', index: item[0].split('_')[1].replace(/[i,j,k,l]/g, x=>numberIndex[x]), value: `${item[1]}`, letIndex: item[0].split('_')[1]}))].slice(1))

            setDipoleZ([...Object.entries(objDipoleZ).map(item=>({var:'const', index: item[0].split('_')[1].replace(/[i,j,k,l]/g, x=>numberIndex[x]), value: `${item[1]}`, letIndex: item[0].split('_')[1]}))].slice(1))

        }
        
        reader.readAsText(e.target.files[0])
        //e.target.value = "";
    }

    const onClick = (e) => {
        e.target.value = '';
    }

    useEffect(
        () => {
            setConstsList(state.consts)
        },
        [state.consts],
    );

    useEffect(
        () => {
            setDipoleXList(state.dipoleX)
        },
        [state.dipoleX],
    );

    useEffect(
        () => {
            setDipoleYList(state.dipoleY)
        },
        [state.dipoleY],
    );

    useEffect(
        () => {
            setDipoleZList(state.dipoleZ)
        },
        [state.dipoleZ],
    );

    useEffect(
        () => {
            setOmegasList(state.omegas)
        },
        [state.omegas],
    );

    return(
        <div style={{marginLeft: 50}}>
            <AppBar style={{background: 'white', width: `calc(100% - 50px)`, }}>
                <Toolbar style={{display: 'flex' }}>
                    
                    <div className='input'>

                        <TextField value={state.freedomDegrees} style={{margin: 10, width: 130}} label={'Степени свободы'} size='small' onChange={setFreedomDegrees}/>

                        <TextField value={state.order} style={{margin: 10, width: 80}} label={'Порядок'} size='small' onChange={setOrder}/>

                        <div>
                            <div className='radio-label'>Тип констант</div>
                            <FormControl style={{marginLeft: 10, padding: '0 10px', border: '1px solid #c4c4c4', borderRadius: 4,}}>
                                <RadioGroup
                                    row
                                    value={state.constsType}
                                    onChange={(e)=>setConstsType(e)}
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

                            </IconButton>
                        </Tooltip>
                    </div>

                </Toolbar>
            </AppBar>

            <Content 
                state = {state} 
                frequencyList = {omegasList} 
                constsList = {constsList}
                dipoleXList = {dipoleXList}
                dipoleYList = {dipoleYList}
                dipoleZList = {dipoleZList}
                calculation = {handleClickCalculation}
                someEmpty = {someEmpty}
                load = {load}
            />

        </div>
    )
}

export default CalculationPage