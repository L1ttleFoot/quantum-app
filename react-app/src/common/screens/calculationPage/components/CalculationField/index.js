import React from 'react'
import '../../style.css'
import { Button, CircularProgress } from '@mui/material'
import { fetchCalc, fetchRes } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'

const CalculationFiled = (props) => {

    const dispatch = useDispatch()
    const state = useSelector(state => state.data)
    const http = useSelector(state => state.http)

    const { resonans, someEmpty } = props

    return (
        <div className={'calcFields'}>
            <Button
                endIcon={http.loadingCalc ? <CircularProgress size={20} /> : ''}
                fullWidth={true}
                variant='contained'
                onClick={() => fetchCalc(dispatch, state)}
                disabled={someEmpty || http.loadingCalc}
                style={{ margin: '0px 5px' }}
            >
                Расчет
            </Button>

            <Button
                endIcon={http.loadingRes ? <CircularProgress size={20}/> : ''}
                fullWidth={true}
                variant='contained'
                onClick={() => fetchRes(dispatch, state)}
                disabled={someEmpty || http.loadingCalc}
                style={{ margin: '0px 5px' }}
            >
                Резонанс
            </Button>
        </div>
    )
}

export default CalculationFiled