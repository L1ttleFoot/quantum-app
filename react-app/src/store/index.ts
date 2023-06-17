import { configureStore } from "@reduxjs/toolkit";
import { calcPageData, calcPageHttp } from "./redusers"

const calcData = calcPageData.reducer
const calcHttp = calcPageHttp.reducer

const store = configureStore({
    reducer: {
        data: calcData,
        http: calcHttp
    },
});

export { store }