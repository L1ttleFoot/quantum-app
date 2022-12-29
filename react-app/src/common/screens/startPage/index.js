import React, { useState } from 'react'
import { AppBar, Toolbar } from '@mui/material';
import './style.css'

const StartPage = (props) => {

    return(
        <div>
            <AppBar style={{background: 'white', position:'absolute'}}>
                <Toolbar style={{display: 'flex' }}>

                </Toolbar>
            </AppBar>
        </div>
    )
}

export default StartPage