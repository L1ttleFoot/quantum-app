import { createStore } from 'redux'
import { initialState } from '../common/initialState'

const reduser = (state = initialState, action) => {
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
        case "PUSH_ROWS":
            state.rows.push(action.payload)
            return {...state}
        case "SET_ROWS":
            return {...state, rows: action.payload}
        default:
            return state
    }
}

export const store = createStore(reduser)