import React, { useState } from 'react'
import '../../style.css'
import { Typography, Skeleton, Tab, Tabs } from '@mui/material'
import { useTypedSelector } from '../../../../../helpers/hooks/useTypedSelector'

const ConstsField = () => {

    const [tab, setTab] = useState('x')

    const onChangeTab = (e: React.SyntheticEvent, value: string) => {
        setTab(value)
    }

    const data = useTypedSelector(state => state.data)

    const { freedomDegrees, order } = data

    function permutationsWithoutMirror(n: number, k: number): number {
        let numerator = 1;
        let denominator = 1;
        for (let i = 0; i < k; i++) {
            numerator *= n + i;
            denominator *= i + 1;
        }
        return numerator / denominator;
    }

    const sum = Array.from({ length: order+1 }, (_, i) => i+1).map(item => permutationsWithoutMirror(freedomDegrees, item)).reduce((acc, curr) => acc + curr, 0);

    const myArray = Array.from({ length: sum+1 }, (_, index) => index + 1);

    return (
        <div className='block'>
            
            <Typography variant="body1" component='span'>Производные дипольного момента</Typography>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Tabs value={tab} onChange={onChangeTab} variant="fullWidth">
                    <Tab label="X" value="x" />
                    <Tab label="Y" value="y" />
                    <Tab label="Z" value="z" />
                </Tabs>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}
            >
                {myArray.map((_, index) =>
                    <Skeleton
                        key={index}
                        variant="rounded"
                        width={'15%'}
                        height={'40px'}
                        style={{ margin: 10, width: '20%', minWidth: 80 }}
                    />)}

            </div>
        </div>
    )
}

export default ConstsField