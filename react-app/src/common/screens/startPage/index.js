import React from 'react'
import { AppBar, Toolbar, Paper, Typography, Divider } from '@mui/material'
import './style.css'

const StartPage = (props) => {

    return (
        <div style={{ marginLeft: 60 }}>
            <AppBar style={{ background: 'white', position: 'absolute' }}>
                <Toolbar style={{ display: 'flex' }}>

                </Toolbar>
            </AppBar>

            <div>

                <Paper style={{ margin: 20 }}>
                    <Typography variant="h2" style={{ textAlign: 'center' }} >
                        Тут будет какая то информация
                    </Typography>
                </Paper>

                <Paper style={{ margin: 20, padding: 20, display: 'flex' }}>

                    <Typography variant="h4" style={{ textAlign: 'center' }} >
                        Вот тут будет блок информации возможно
                    </Typography>

                    <Divider orientation='vertical' flexItem />

                    <Typography variant="h4" style={{ textAlign: 'center' }} >
                        И вот тут их можно типа разделить на столбцы
                    </Typography>

                </Paper>

            </div>

        </div>
    )
}

export default StartPage