import React, {useEffect, useState} from 'react';
import styles from '../style.module.css';
import {Paper} from '@mui/material';
import Chart from '../components/Charts';
import DipoleField from '../components/DipoleField';
import Table from '../components/Table';
import OmegasField from '../components/OmegasField';
import ConstsField from '../components/ConstsField';
import ConstsSkeleton from '../components/ConstsSkeleton';
import DipoleSkeleton from '../components/DipoleSkeleton';
import CalculationFiled from '../components/CalculationField';
import RickRoll from '../components/RickRoll';
import {useTypedSelector} from '../../../../helpers/hooks/useTypedSelector';
import StateFieldCopy from '../components/StateField';

interface ICalc {
    someEmpty: boolean;
}

const CalculationPage: React.FC<ICalc> = ({someEmpty}) => {
    const data = useTypedSelector((state) => state.data);
    const http = useTypedSelector((state) => state.http);

    const [selectedRows, setSelectedRows] = useState([]);

    const updateSelectedRows = (rows: any) => {
        setSelectedRows(rows);
    };

    const rows = [...data.rows].map((item, index) => ({...item, id: index + 1}));

    useEffect(
        () => {
            updateSelectedRows(rows);
        },
        // eslint-disable-next-line
        [data.rows],
    );

    const [open, setOpen] = useState(false);

    return (
        <div className={styles.container}>
            <Paper className={styles.box1}>
                <StateFieldCopy />
            </Paper>

            <Paper className={styles.box2}>
                <OmegasField />
            </Paper>

            <Paper className={styles.box3}>
                {!http.loadingConfig ? <ConstsField /> : <ConstsSkeleton />}
            </Paper>

            <Paper className={styles.box4}>
                {!http.loadingConfig ? <DipoleField /> : <DipoleSkeleton />}
            </Paper>

            <Paper className={styles.box5}>
                <Table selectedRows={selectedRows} updateSelectedRows={updateSelectedRows} />
            </Paper>

            <Paper className={styles.box6}>
                <Chart data={selectedRows} />
            </Paper>

            <Paper className={styles.box7}>
                <CalculationFiled resonans={() => setOpen(true)} someEmpty={someEmpty} />
            </Paper>

            <Paper>
                <RickRoll open={open} />
            </Paper>
        </div>
    );
};

export default CalculationPage;
