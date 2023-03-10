import React from 'react'
import '../../style.css'
import { Button, CircularProgress } from '@mui/material'

const CalculationFiled = (props) => {

    const { calculation, resonans, someEmpty, load } = props

    return (
        <div className={'calcFields'}>
            <Button
                endIcon={load ? <CircularProgress size={20} /> : ''}
                fullWidth={true}
                variant='contained'
                onClick={calculation}
                disabled={someEmpty || load}
                style={{ margin: '0px 5px' }}
            >
                Расчет
            </Button>

            <Button
                endIcon={load ? <CircularProgress size={20}/> : ''}
                fullWidth={true}
                variant='contained'
                onClick={resonans}
                disabled={someEmpty || load}
                style={{ margin: '0px 5px' }}
            >
                Резонанс
            </Button>
        </div>
    )
}

export default CalculationFiled