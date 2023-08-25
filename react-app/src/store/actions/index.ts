import { useDispatch } from "react-redux";
import { setNumbers1, setNumbers2, setOmegas, setConsts } from "../../common/screens/calculationPage/slice";

const dispatch = useDispatch()

export const dispatchNumbers1 = (value: object[]) => dispatch(setNumbers1(value))
export const dispatchNumbers2 = (value: object[]) => dispatch(setNumbers2(value))
export const dispatcOmegas = (value: object[]) => dispatch(setOmegas(value))
export const dispatchConsts = (value: object[]) => dispatch(setConsts(value))