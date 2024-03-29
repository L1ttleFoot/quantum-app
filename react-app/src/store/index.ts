import { configureStore } from "@reduxjs/toolkit";
import { calcPageData, calcPageHttp } from "../common/screens/calculationPage/slice";

const calcData = calcPageData.reducer
const calcHttp = calcPageHttp.reducer

//const calcPage = {data: calcData, http: calcHttp}

//const rootReducer = combineReducers({'data': calcData, 'http': calcHttp})

const store = configureStore({
    reducer: {data: calcData, http: calcHttp}
});

export type RootState = ReturnType<typeof store.getState>
export { store }