import styles from '../../style.module.css'
import { Button, CircularProgress } from '@mui/material'
import { fetchCalc } from '../../requests'
import { useDispatch, useSelector } from 'react-redux'

const CalculationFiled = (props) => {

    const dispatch = useDispatch()
    const state = useSelector(state => state.data)
    const http = useSelector(state => state.http)

    const { someEmpty } = props

    return (
        <div className={styles.calcFields}>
            <Button
                endIcon={http.loadingCalc ? <CircularProgress size={20} /> : ''}
                fullWidth={true}
                variant='contained'
                onClick={() => dispatch(fetchCalc(state))}
                //disabled={someEmpty || http.loadingCalc}
                disabled={http.loadingCalc}
                style={{ margin: '0px 5px' }}
            >
                Расчет
            </Button>

            {/* <MyButton 
                onClick={() => console.log('test')}
                disabled={someEmpty || http.loadingCalc}
            >
                Расчет
            </MyButton> */}
        </div>
    )
}

export default CalculationFiled