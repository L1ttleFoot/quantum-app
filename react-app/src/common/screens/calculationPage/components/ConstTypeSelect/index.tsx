import { FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { useTypedSelector } from '../../../../../helpers/hooks/useTypedSelector';
import { constsDict } from '../../consts';
import { useAction } from '../../slice/useAction'
import styles from './constType.module.css'

const ConstTypeSelect = () => {

    const {setConstsType} = useAction()

    const data = useTypedSelector(state => state.data)

    return (
        <div>
            <div className={styles['radio-label']}>Тип констант</div>
            <FormControl style={{ marginLeft: 10, padding: '0 10px', border: '1px solid #c4c4c4', borderRadius: 4, }}>
                <RadioGroup
                    row
                    value={data.constsType}
                    onChange={e => setConstsType(e.target.value)}
                >
                    {constsDict.map(item => 
                        <FormControlLabel key={item.label} style={{ color: '#0E76BB' }} value={item.value} label={item.label}  control={<Radio size='small' />} />
                    )}
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default ConstTypeSelect
