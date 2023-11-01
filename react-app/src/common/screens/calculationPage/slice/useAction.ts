import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { 
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
    setRequestCalc, 
    setRequestConfig
} from "./index";

export const useAction = () => {

    const dispatch = useDispatch()

    return bindActionCreators({
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
        setRequestCalc,
        setRequestConfig}, 
        dispatch)
}