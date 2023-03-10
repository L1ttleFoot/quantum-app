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

                <Paper style={{ margin: 20, color: '#49acff',textShadow: '4px 4px #558ABB' }}>
                    <Typography variant="h2" style={{ textAlign: 'center' }} >
                        Институт квантовой физики
                    </Typography>
                </Paper>

                <Paper style={{ margin: 20, padding: 20, display: 'flex' }}>

                    <Typography variant="h4" style={{ textAlign: 'center', width: '50%' }} >
                        Блок с информацией
                    </Typography>

                    <Divider orientation='vertical' flexItem />

                    <Typography variant="h4" style={{ textAlign: 'center', width: '50%'  }} >
                        Другой блок с информацией
                    </Typography>

                </Paper>

            </div>

        </div>
    )
}

export default StartPage