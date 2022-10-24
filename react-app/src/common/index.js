import React, {useState, useEffect} from 'react'
import { AppBar, Toolbar, Button, TextField, FormControl, FormControlLabel, RadioGroup, Radio, IconButton, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import MainPage from "./screens/main"
import './style.css'
import UploadIcon from '@mui/icons-material/Upload';

const Main = () => {

    const dispatch = useDispatch()

    const state = useSelector(state=>state)

    const [omegasList, setOmegasList] = useState([])
    const [constsList, setConstsList] = useState([])
    const [loading, setLoading] = useState(false)

    const [fileName, setFileName] = useState('')

    const setRows = (value) => {
        dispatch({type:'SET_ROWS', payload: value})
    }

    const handleClickConfig = () => {

        fetch(`/api/v1/config?freedomDegrees=${state.freedomDegrees}&order=${state.order}`)
        .then(response=>response.json())
        .then(data=>{
            setConstsList(data.consts_list)
            setOmegasList(data.omegas_list)
        })

    };

    const handleClickCalculation = () => {

        fetch(`/api/v1/calculation`, 
        {   method: 'POST',  
            body: JSON.stringify({
                numbers1: state.numbers1, 
                numbers2: state.numbers2, 
                omegas: state.omegas, 
                consts: state.consts, 
                constsType: state.constsType
        })})
        .then(response=>response.json())
        .then(data=>{
            setRows([...state.rows, data])
        })
        .catch(error => {
            console.log(error)
        });

    };

    const setConstsType = (e) => {
        dispatch({type:'SET_CONSTS_TYPE', payload: e.target.value})
    }

    const setFreedomDegrees = (value) => {
        dispatch({type:'SET_FREEDOM_DEGREES', payload: value.target.value})
    }

    const setOrder = (value) => {
        dispatch({type:'SET_ORDER', payload: value.target.value})
    }

    const setOmegas = (value) => {
        dispatch({type:'SET_OMEGAS', payload: value})
    }

    const setConsts = (value) => {
        dispatch({type:'SET_CONSTS', payload: value})
    }

    const voidNumbers1 = [undefined, ''].some(item=>state.numbers1.map(el=>el.value).includes(item))
    const voidNumbers2 = [undefined, ''].some(item=>state.numbers2.map(el=>el.value).includes(item))
    const voidOmegas = [undefined, ''].some(item=>state.omegas.map(el=>el.value).includes(item))
    const voidConsts = [undefined, ''].some(item=>state.consts.map(el=>el.value).includes(item))

    const letterIndexes='ijkl'

    const numberIndex = {
        'i':'1',
        'j':'2',
        'k':'3',
        'f':'4',
    }

    const onChange = (e)=> {
        
        let reader = new FileReader()

        reader.onload = function(event) {

            console.log(e.target.files[0].name)

            setFileName(e.target.files[0].name)

            let objOmegas = JSON.parse(event.target.result.split('\n').filter(item=>item.includes('const_omega'))[0].replace(/\r/g, '').split('=')[1].replace(/omega_[a-z]/g, x=> `"${x}"`))
        
            let objConsts = JSON.parse(event.target.result.split('\n').filter(item=>item.includes('const_anharmonic'))[0].replace(/\r/g, '').split('=')[1].replace(/A_[a-z]{0,4}/g, x=> `"${x}"`))
        
            //console.log(Object.entries(objConsts).map(item=>({var:'const', index: item[0].split('_')[1].replace(/[i,j,k,l]/g, x=>numberIndex[x]), value: `${item[1]}`, letIndex: item[0].split('_')[1]})))

            setOmegas([...Object.values(objOmegas).map((item, index)=>({var: 'number', index: index+1, value: `${item}`, letIndex: letterIndexes[index]}))])

            setConsts([...Object.entries(objConsts).map(item=>({var:'const', index: item[0].split('_')[1].replace(/[i,j,k,l]/g, x=>numberIndex[x]), value: `${item[1]}`, letIndex: item[0].split('_')[1]}))])

            //console.log(objOmegas)

            //console.log(Object.values(objOmegas).map((item, index)=>({var: 'number', index: index+1, value: `${item}`, letIndex: letterIndexes[index]})))

            //console.log(JSON.parse(event.target.result.split('\n').filter(item=>item.includes('const_omega'))[0].replace(/\r/g, '').split('=')[1].replace(/omega_[a-z]/g, x=> `"${x}"`)))
        }
        //replace(/omega/g, function myFunction(x){return x.toUpperCase();})
        reader.readAsText(e.target.files[0])
    }

    useEffect(
        () => {
            setConstsList(state.consts)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [state.consts],
    );

    useEffect(
        () => {
            setOmegasList(state.omegas)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [state.omegas],
    );

    return(
        <div>
            <AppBar style={{background: 'white', position:'absolute'}}>
                <Toolbar style={{display: 'flex', justifyContent: 'space-between' }}>
                    
                        <div className='input'>

                            <TextField value={state.freedomDegrees} style={{margin: 10, width: 130}} label={'Степени свободы'} size='small' onChange={setFreedomDegrees}></TextField>

                            <TextField value={state.order} style={{margin: 10, width: 80}} label={'Порядок'} size='small' onChange={setOrder}></TextField>

                            <div>
                            <div className='radio-lable'>Тип констант</div>
                            <FormControl style={{marginLeft: 10, padding: '0 10px', border: '1px solid #c4c4c4', borderRadius: 4,}}>
                                {/* <FormLabel>Тип констант</FormLabel> */}
                                <RadioGroup
                                    row
                                    defaultValue="A"
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

                            <Tooltip title="Загрузить файл" placement="left">
                                <IconButton color="primary" component="label">
                                    <input
                                        onChange={onChange}
                                        accept="application/json,.py,.txt"
                                        type="file"
                                        hidden
                                    />
                                    <UploadIcon />
                                </IconButton>
                            </Tooltip>

                            <Button 
                                onClick={handleClickConfig} 
                                variant={"outlined"}
                                style={{background: 'white', margin: 10}}
                            >
                                Задать параметры
                            </Button>
                    
                            <Button 
                                disabled={voidNumbers1 || voidNumbers2 || voidOmegas || voidConsts} 
                                onClick={handleClickCalculation} 
                                variant="outlined" 
                                style={{background: 'white', margin: 10}}
                            >
                                Расчет
                            </Button>
                            
                        </div>

                </Toolbar>
            </AppBar>

            <MainPage state={state} frequencyList={omegasList} constsList={constsList}/>

        </div>
    )
}

export default Main