import { createStore } from 'redux'
import { initialState } from '../common/initialState'

const reduser = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CASH":
            return {...state, cash: state.cash + action.payload}
        case "SET_VALUE1":
            return {...state, value1: action.payload}
        case "SET_VALUE2":
            return {...state, value1: action.payload}
        case "SET_VALUE3":
            return {...state, value1: action.payload}
        case "GET_CASH":
            return {...state, cash: state.cash - action.payload}
        default:
            return state
    }
}

export const store = createStore(reduser)