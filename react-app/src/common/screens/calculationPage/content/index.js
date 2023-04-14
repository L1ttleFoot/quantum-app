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
import ConstsSkeleton from '../components/ConstsSkeleton'
import DipoleSkeleton from '../components/DipoleSkeleton'
import CalculationFiled from '../components/CalculationField'
import RickRoll from '../components/RickRoll'

const CalculationPage = (props) => {

    const { someEmpty } = props

    const state = useSelector(state => state.data)
    const http  = useSelector(state => state.http)

    console.log(http.loadingConfig)

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

    const [open, setOpen] = useState(false)

    return (
        <div className={'container'}>

            <Paper className={'box1'}>
                <StateField />
            </Paper>

            <Paper className={'box2'}>
                <OmegasField />
            </Paper>

            <Paper className={'box3'}>
                {!http.loadingConfig ? <ConstsField /> :  <ConstsSkeleton />}
            </Paper>

            <Paper className={'box4'}>
                {!http.loadingConfig ? <DipoleField /> :  <DipoleSkeleton />}
            </Paper>

            <Paper className={'box5'}>
                <Table selectedRows={selectedRows} updateSelectedRows={updateSelectedRows} />
            </Paper>

            <Paper className={'box6'}>
                <Chart data={selectedRows} />
            </Paper>

            <Paper className={'box7'}>
                <CalculationFiled resonans={()=>setOpen(true)} someEmpty={someEmpty}/>
            </Paper>

            <Paper>
                <RickRoll open={open}/>
            </Paper>

        </div>
    )
}

export default CalculationPage