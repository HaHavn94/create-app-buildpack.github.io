import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { NavLink } from 'react-router-dom'
import EventIcon from '@mui/icons-material/Event';
import BarChartIcon from '@mui/icons-material/BarChart';
import '../App.css'

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const menuItem = [
        {
            path: "/",
            name: "Customers",
            icon: <DirectionsRunIcon />

        },
        {
            path: "/trainings",
            name: "Trainings",
            icon: <AccessibilityNewIcon />,

        },
        {
            path: "/calendar",
            name: "Calendar",
            icon: <EventIcon />

        },
        {
            path: "/barchart",
            name: "Chart",
            icon: <BarChartIcon />

        },
    ]
    return (
        <div className="container">
            <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Menu</h1>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <MenuIcon onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
                            <div className="icon">{item.icon} </div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name} </div>
                        </NavLink>
                    )
                    )
                }
            </div>
            <main>{children} </main>
        </div>
    )
}
export default Sidebar