import { configureStore } from "@reduxjs/toolkit";
import { calcPageData, calcPageHttp } from "../common/screens/calculationPage/slice";

const calcData = calcPageData.reducer
const calcHttp = calcPageHttp.reducer

const store = configureStore({
    reducer: {
        data: calcData,
        http: calcHttp
    },
});

export { store }