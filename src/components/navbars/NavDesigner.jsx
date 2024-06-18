import React from "react";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { FaTools } from "react-icons/fa";

const Navbar = ({ onLogout }) => {
    return (
        <AppBar position="fixed">
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, display:'flex', alignItems:'center' }}>
                <div>
                <FaTools  style={{ marginRight: '8px',  fontSize:'25px'}} />
                </div>
                DESIGNER    
                </Typography>
                <Button color="inherit" onClick={onLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;