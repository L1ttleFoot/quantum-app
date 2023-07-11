import {
    setConsts,
    setDipoleX,
    setDipoleY,
    setDipoleZ,
    setRows,
    setRequestConfig,
    setRequestCalc,
    setRequestRes
} from "../../../../store/redusers";
import { saveAs } from 'file-saver'


const url = 'https://quantum-app-backend.onrender.com/'
//const url = 'https://quantum-app-bf8b.vercel.app'
//const url = 'http://localhost:8080'

const fetchConfig = async (dispatch, state) => {

    dispatch(setRequestConfig({ status: 202, loading: true }))

    await fetch(`${url}/api/v1/config?freedomDegrees=${state.freedomDegrees}&order=${state.order}`)
        .then(response => {
            if (response.status !== 200) {
                const error = new Error();
                error.code = response.status
                throw error
            }
            return response.json();
        })
        .then(data => {
            dispatch(setConsts(data.consts_list))
            dispatch(setDipoleX(data.dipole_list_x))
            dispatch(setDipoleY(data.dipole_list_y))
            dispatch(setDipoleZ(data.dipole_list_z))
            dispatch(setRequestConfig({ status: 200, loading: false }))
        }).catch(error => {
            dispatch(setRequestConfig({ status: error.code, loading: false }))
            console.log(error)
        });
}

const fetchCalc = async (dispatch, state) => {

    dispatch(setRequestCalc({ status: 202, loading: true }))

    await fetch(`${url}/api/v1/calculation`,
        {
            method: 'POST',
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
            })
        })
        .then(response => response.json())
        .then(data => {
            dispatch(setRows([...state.rows, data]))
        })
        .catch(error => {
            console.log(error)
        });

    dispatch(setRequestCalc({ status: 200, loading: false }))
}

const fetchRes = async (dispatch, state) => {

    dispatch(setRequestRes({ status: 202, loading: true }))

    await fetch(`${url}/api/v1/calculation_resonans`,
        {
            method: 'POST',
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
            })
        })
        .then(response => response.json())
        .then(data => {
            dispatch(setRows([...state.rows, ...data]))
        })
        .catch(error => {
            console.log(error)
        });

    dispatch(setRequestRes({ status: 200, loading: false }))
}

const fetchFile = async (state) => {

    await fetch(`${url}/api/v1/get_file`,
    {
        method: 'POST',
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
        })
    })
    .then(response =>
        response.blob())
    .then(myBlob =>
        saveAs(myBlob, 'consts.py'))
    .catch(error => {
        console.log(error)
    });

}

export {
    fetchConfig,
    fetchCalc,
    fetchRes,
    fetchFile
}