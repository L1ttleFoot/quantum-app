import {createSlice} from '@reduxjs/toolkit';
import {initialState, letterIndexes} from '../initialState';

const {calcData, calcHttp} = initialState;

export const calcPageData = createSlice({
    name: 'calcData',
    initialState: calcData,
    reducers: {
        setStates(state, action) {
            state.states = action.payload;
        },
        setOmegas(state, action) {
            state.omegas = action.payload;
        },
        setConsts(state, action) {
            state.consts = action.payload;
        },
        setDipole0(state, action) {
            state.dipole0 = action.payload;
        },
        setDipoleX(state, action) {
            state.dipoleX = action.payload;
        },
        setDipoleY(state, action) {
            state.dipoleY = action.payload;
        },
        setDipoleZ(state, action) {
            state.dipoleZ = action.payload;
        },
        setFreedomDegrees(state, action) {
            state.freedomDegrees = Number(action.payload);
            state.nList = new Array(Number(action.payload))
                .fill(undefined)
                .map((_, index) => `n_${letterIndexes[index]}`);
        },
        setOrder(state, action) {
            state.order = action.payload;
        },
        setConstsType(state, action) {
            state.constsType = action.payload;
        },
        setRows(state, action) {
            state.rows = action.payload;
        },
    },
});

export const calcPageHttp = createSlice({
    name: 'calcHttp',
    initialState: calcHttp,
    reducers: {
        setRequestConfig(state, action) {
            state.loadingConfig = action.payload.loading;
            state.statusConfig = action.payload.status;
        },
        setRequestCalc(state, action) {
            state.loadingCalc = action.payload.loading;
            state.statusCalc = action.payload.status;
        },
    },
});

export const {
    setFreedomDegrees,
    setOrder,
    setConstsType,
    setConsts,
    setOmegas,
    setStates,
    setDipole0,
    setDipoleX,
    setDipoleY,
    setDipoleZ,
    setRows,
} = calcPageData.actions;

export const {setRequestCalc, setRequestConfig} = calcPageHttp.actions;
