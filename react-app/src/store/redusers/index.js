import { createAction, createReducer } from "@reduxjs/toolkit";
import { initialState } from "../../common/initialState";
import { useDispatch } from "react-redux";

export const setOmegas = createAction('SET_OMEGAS')
export const setNumbers1 = createAction('SET_NUMBERS1')
export const setNumbers2 = createAction('SET_NUMBERS2')
export const setFreedomDegrees = createAction('SET_FREEDOM_DEGREES')
export const setOrder = createAction('SET_ORDER')
export const setConstsType = createAction('SET_CONSTS_TYPE')

export const setConsts = createAction('SET_CONSTS')
export const setDipole0 = createAction('SET_DIPOLE_0')
export const setDipoleX = createAction('SET_DIPOLE_X')
export const setDipoleY = createAction('SET_DIPOLE_Y')
export const setDipoleZ = createAction('SET_DIPOLE_Z')
export const setRows = createAction('SET_ROWS')

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_NUMBERS1":
            return {...state, numbers1: action.payload}
        case "SET_NUMBERS2":
            return {...state, numbers2: action.payload}
        case "SET_OMEGAS":
            return {...state, omegas: action.payload}
        case "SET_CONSTS":
            return {...state, consts: action.payload}
        case "SET_DIPOLE_0":
            return {...state, dipole0: action.payload} 
        case "SET_DIPOLE_X":
            return {...state, dipoleX: action.payload} 
        case "SET_DIPOLE_Y":
            return {...state, dipoleY: action.payload}   
        case "SET_DIPOLE_Z":
            return {...state, dipoleZ: action.payload}   
        case "SET_FREEDOM_DEGREES":
            return {...state, freedomDegrees: action.payload}
        case "SET_ORDER":
            return {...state, order: action.payload}
        case "SET_CONSTS_TYPE":
            return {...state, constsType: action.payload}
        case "SET_ROWS":
            return {...state, rows: action.payload}
        default:
            return state
    }
}

export const myReduser = createReducer(initialState,{
    [setOmegas]: (state, action) => {
        return {...state, omegas: action.payload}
    },
    [setNumbers1]: (state, action) => {
        return {...state, numbers1: action.payload}
    },
    [setNumbers2]: (state, action) => {
        return {...state, numbers2: action.payload}
    },
    [setFreedomDegrees]: (state, action) => {
        state.freedomDegrees = action.payload
    },
    [setOrder]: (state, action) => {
        state.order = action.payload
    },
    [setConstsType]: (state, action) => {
        state.constsType = action.payload
    },
    [setConsts]: (state, action) => {
        return {...state, consts: action.payload}
    },
    [setDipole0]: (state, action) => {
        return {...state, dipole0: action.payload}
    },
    [setDipoleX]: (state, action) => {
        return {...state, dipoleX: action.payload}
    },
    [setDipoleY]: (state, action) => {
        return {...state, dipoleY: action.payload}
    },
    [setDipoleZ]: (state, action) => {
        return {...state, dipoleZ: action.payload}
    },
    [setRows]: (state, action) => {
        return {...state, rows: action.payload}
    },
})


export const UsePage = () => {

    const dispatch = useDispatch()

    const dispatchHelpers = {
        dispatchFreedomDegrees: (value) => dispatch(setFreedomDegrees(value)),
        dispatchOrder: (value) => dispatch(setOrder(value)),
        dispatchConstsType: (value) => dispatch(setConstsType(value)),
        dispatchConsts: (value) => dispatch(setConsts(value)),
        dispatchOmegas: (value) => dispatch(setOmegas(value)),
        dispatchNumbers1: (value) => dispatch(setNumbers1(value)),
        dispatchNumbers2: (value) => dispatch(setNumbers2(value)),
        dispatchDipole0: (value) => dispatch(setDipole0(value)),
        dispatchDipoleX: (value) => dispatch(setDipoleX(value)),
        dispatchDipoleY: (value) => dispatch(setDipoleY(value)),
        dispatchDipoleZ: (value) => dispatch(setDipoleZ(value)),
        dispatchRows: (value) => dispatch(setRows(value)),
    }
    
    return dispatchHelpers
}