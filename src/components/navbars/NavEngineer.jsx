import React from "react";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { MdOutlineEngineering } from "react-icons/md";

const Navbar = ({ onLogout }) => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, display:'flex', alignItems:'center' }}>
                <div>
                <MdOutlineEngineering style={{ marginRight: '8px',  fontSize:'32px'}} />
                </div>
                ENGINEER     
                </Typography>
                <Button color="inherit" onClick={onLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;