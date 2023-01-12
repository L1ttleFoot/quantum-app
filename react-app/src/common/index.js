import React, {useState, useEffect} from 'react'
import {Routes, Route, useLocation} from 'react-router-dom'
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider } from '@mui/material';
import './style.css'
import StartPage from './screens/startPage'
import CalculationPage from './screens/calculationPage'
import { useNavigate } from "react-router";
import ArticleIcon from '@mui/icons-material/Article';
import CalculateIcon from '@mui/icons-material/Calculate';

const Main = () => {

    const [tab, setTab] = useState('Info')

    const location = useLocation();

    useEffect(() => {

        if (location.pathname.indexOf('calculation') > 0) {
            setTab('Calculation');
        }

        else {
            setTab('Info');
        }

    }, [location]);

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

                <List
                    style={{
                        paddingTop:0,
                        overflow:'hidden'
                    }}
                    sx={{
                        overflow:'hidden',
                        padding:0,
                        width:50,
                        // selected and (selected + hover) states
                        '&& .Mui-selected, && .Mui-selected:hover': {
                          bgcolor: '#0E76BB',
                          '&, & .MuiListItemIcon-root': {
                           color: 'white',
                          },
                        },
                        // hover states
                    }}
                >
                    {menuItems.map(item => (
                        <ListItemButton
                            selected={item.text===tab}
                            key={item.text}
                            onClick={() => {navigate(item.path);setTab(item.text)}}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            {/* <ListItemText primary={item.text}/> */}
                        </ListItemButton>
                    ))}
                </List>

            </Drawer>

            <Routes>
                <Route path='/' element={<StartPage/>}/>
                <Route path='/calculation' element={<CalculationPage/>}/>
            </Routes>

        </div>
    )
}

export default Main