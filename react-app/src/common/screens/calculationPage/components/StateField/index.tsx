import React, {useEffect} from 'react';
import {useTypedSelector} from '../../../../../helpers/hooks/useTypedSelector';
import {TextField, Stack, Typography} from '@mui/material';
import {useAction} from '../../slice/useAction';
import {ControlPoint, RemoveCircleOutline} from '@mui/icons-material';
import styles from './state.module.css';

const StateField = () => {
    const {setStates} = useAction();

    const data = useTypedSelector((state) => state.data);

    const {freedomDegrees, states} = data;

    useEffect(
        () => {
            setStates(
                states.map((item) => ({...item, value: [...new Array(freedomDegrees).fill('')]})),
            );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [freedomDegrees],
    );

    const handleChangeState =
        (index1: number, index2: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setStates(
                states.map((item, index) =>
                    index === index1
                        ? {
                              ...item,
                              value: item.value.map((item, indexItem) =>
                                  index2 === indexItem ? event.target.value : item,
                              ),
                          }
                        : item,
                ),
            );
        };

    const handleChangeStateAdd = () => () => {
        setStates([
            ...states,
            {
                index: states[states.length - 1].index + 1,
                value: [...new Array(freedomDegrees).fill('')],
            },
        ]);
    };

    const handleChangeStateRemove = (n: number) => {
        setStates(states.filter((item) => item.index !== n));
    };

    return (
        <div className={styles.stateField}>
            <div className={styles.block}>
                <Typography variant="body2" component="span">
                    Состояния
                </Typography>
                <div style={{position: 'relative'}}>
                    {states.map((state, indexState) => (
                        <Stack
                            style={{position: 'relative'}}
                            key={indexState}
                            direction={'row'}
                            alignItems={'center'}
                        >
                            {indexState !== 0 && (
                                <div>
                                    <RemoveCircleOutline
                                        className={styles.iconRemove}
                                        onClick={() => handleChangeStateRemove(state.index)}
                                        fontSize="small"
                                    />
                                </div>
                            )}

                            {state.value.map((item, indexValue) => (
                                <TextField
                                    key={indexValue + 'state'}
                                    size={'small'}
                                    style={{margin: 10}}
                                    label={
                                        <span>
                                            n<sub>{indexValue + 1}</sub>
                                        </span>
                                    }
                                    value={item}
                                    onChange={handleChangeState(indexState, indexValue)}
                                />
                            ))}
                        </Stack>
                    ))}
                </div>
            </div>
            <div className={styles.iconAdd} onClick={handleChangeStateAdd()}>
                <ControlPoint />
            </div>
        </div>
    );
};

export default StateField;
