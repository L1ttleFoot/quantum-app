import React, { useEffect } from 'react'
import { useTypedSelector } from '../../../../../helpers/hooks/useTypedSelector'
import '../../style.css'
import { TextField, Stack, Typography } from '@mui/material'
import { useAction } from '../../slice/useAction'

const OmegasField = () => {

    const {setOmegas} = useAction()

    const data = useTypedSelector(state => state.data)

    const { omegas, freedomDegrees } = data

    const letterIndexes = 'ijkl'

    useEffect(
        () => {
            setOmegas(new Array(Number(freedomDegrees)).fill(undefined).map((item, index) => ({ var: 'omega', index: index + 1, value: '', letIndex: letterIndexes[index] })))
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [freedomDegrees],
    );

    const handleChangeOmegas = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOmegas = omegas.map((item, indexItem) => index === indexItem ? ({ ...item, value: event.target.value }) : item)
        setOmegas(newOmegas)
    };

    return (
        <div className='block'>
            <Typography variant="body1" component='span'>Гармонические частоты</Typography>
            <Stack direction={'column'} alignItems={'center'}>

                {omegas.map((item, index) =>
                    <TextField
                        key={item.index + 'omega'}
                        size={'small'}
                        style={{ margin: 10 }}
                        label={<span>{decodeURI('%CF%89')}<sub>{item.index}</sub></span>}
                        value={item.value}
                        onChange={handleChangeOmegas(index)}
                    />
                )}

            </Stack>
        </div>
    )
}

export default OmegasField