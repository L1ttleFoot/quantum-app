import { configureStore } from "@reduxjs/toolkit";
import { myReduser } from "./redusers"
import reducer from './redusers';

const store = configureStore({
    reducer: myReduser,
});

export { myReduser, store }