import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../style.css'
import { Paper } from '@mui/material'
import Chart from "../components/Charts"
import DipoleField from '../components/DipoleField';
import Table from '../components/Table';
import StateField from '../components/StateField'
import OmegasField from '../components/OmegasField'
import ConstsField from '../components/ConstsField'
import CalculationFiled from '../components/CalculationField'

const CalculationPage = (props) => {

    const { calculation, someEmpty, load } = props

    const state = useSelector(state => state)

    const [selectedRows, setSelectedRows] = useState([])

    const updateSelectedRows = (rows) => {
        setSelectedRows(rows)
    }

    const rows = [...state.rows].map((item, index) => ({ ...item, id: index + 1 }))

    useEffect(
        () => {
            setSelectedRows(rows)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [state.rows],
    );

    return (
        <div className={'container'}>

            <Paper className={'box1'}>
                <StateField />
            </Paper>

            <Paper className={'box2'}>
                <OmegasField />
            </Paper>

            <Paper className={'box3'}>
                <ConstsField />
            </Paper>

            <Paper className={'box4'}>
                <DipoleField />
            </Paper>

            <Paper className={'box5'}>
                <Table selectedRows={selectedRows} updateSelectedRows={updateSelectedRows} />
            </Paper>

            <Paper className={'box6'}>
                <Chart data={selectedRows} />
            </Paper>

            <Paper className={'box7'}>
                <CalculationFiled calculation={calculation} someEmpty={someEmpty} load={load} />
            </Paper>

        </div>
    )
}

export default CalculationPage