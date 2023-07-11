import { useDispatch } from "react-redux";
import { setConsts, setNumbers1, setNumbers2, setOmegas } from "../redusers";

const dispatch = useDispatch()

export const dispatchNumbers1 = (value: object[]) => dispatch(setNumbers1(value))
export const dispatchNumbers2 = (value: object[]) => dispatch(setNumbers2(value))
export const dispatcOmegas = (value: object[]) => dispatch(setOmegas(value))
export const dispatchConsts = (value: object[]) => dispatch(setConsts(value))