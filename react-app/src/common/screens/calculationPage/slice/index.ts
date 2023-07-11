import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../../../initialState";

const { calcData, calcHttp } = initialState

export const calcPageData = createSlice({
    name: 'calcData',
    initialState: calcData,
    reducers: {
        setNumbers1(state, action) {
            state.numbers1 = action.payload
        },
        setNumbers2(state, action) {
            state.numbers2 = action.payload
        },
        setOmegas(state, action) {
            state.omegas = action.payload
        },
        setConsts(state, action) {
            state.consts = action.payload
        },
        setDipole0(state, action) {
            state.dipole0 = action.payload
        },
        setDipoleX(state, action) {
            state.dipoleX = action.payload
        },
        setDipoleY(state, action) {
            state.dipoleY = action.payload
        },
        setDipoleZ(state, action) {
            state.dipoleZ = action.payload
        },
        setFreedomDegrees(state, action) {
            state.freedomDegrees = action.payload
        },
        setOrder(state, action) {
            state.order = action.payload
        },
        setConstsType(state, action) {
            state.constsType = action.payload
        },
        setRows(state, action) {
            state.rows = action.payload
        }
    },
})

export const calcPageHttp = createSlice({
    name: 'calcHttp',
    initialState: calcHttp,
    reducers: {
        setRequestConfig(state, action) {
            state.loadingConfig = action.payload.loading
            state.statusConfig = action.payload.status
        },
        setRequestCalc(state, action) {
            state.loadingCalc = action.payload.loading
            state.statusCalc = action.payload.status
        },
        setRequestRes(state, action) {
            state.loadingRes = action.payload.loading
            state.statusRes = action.payload.status
        }
    },
})

export const {
    setFreedomDegrees,
    setOrder,
    setConstsType,
    setConsts,
    setOmegas,
    setNumbers1,
    setNumbers2,
    setDipole0,
    setDipoleX,
    setDipoleY,
    setDipoleZ,
    setRows
} = calcPageData.actions;

export const {
    setRequestCalc,
    setRequestConfig,
    setRequestRes
} = calcPageHttp.actions;