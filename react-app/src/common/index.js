import React, {useState, useEffect} from 'react'
import { Routes, Route } from 'react-router-dom'
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider } from '@mui/material';
import './style.css'
import StartPage from './screens/startPage'
import CalculationPage from './screens/calculationPage'
import { useNavigate } from "react-router";
import ArticleIcon from '@mui/icons-material/Article';
import CalculateIcon from '@mui/icons-material/Calculate';

const Main = () => {

    const menuItems = [
        {
          text: 'Info',
          icon: <ArticleIcon/>,
          path: '/'
        },
    
        {
          text: 'Calculation',
          icon: <CalculateIcon/>,
          path: '/calculation'
        },
    ]

    const navigate = useNavigate()

    return(
        <div >

            <Drawer
                className='drawer'
                variant='permanent'
                anchor='left'
            >
                <Toolbar />
                <Divider />

                <List style={{width: 50}}>
                    {menuItems.map(item => (
                        <ListItem
                            
                            button
                            key={item.text}
                            onClick={() => navigate(item.path)}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItem>
                    ))}
                </List>

            </Drawer>

            <Routes>
                    <Route path='/' element={<StartPage/>}></Route>
                    <Route path='/calculation' element={<CalculationPage/>}></Route>
            </Routes>

        </div>
    )
}

export default Main