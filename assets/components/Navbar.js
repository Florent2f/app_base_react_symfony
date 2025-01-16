import React, {Fragment,useState,useEffect,useCallback} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {Link,useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import * as app_actions from '../actions/app/app'


const Navbar = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const signInLink = () => {
        navigate('/signin');
    }
    const signUpLink = () => {
        navigate('/signup');
    }
    const handleLogout = () => {
        dispatch(app_actions.logout());
        navigate('/');
    };

    return (

        <div style={{height: '65px', width: '100%', background: '#1483BD'}}>
            <Toolbar sx={{verticalAlign: 'middle'}}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography sx={{ minWidth: 100}}><Link to="/">LOGO</Link></Typography>
                </Box>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
                </Tooltip>
            </Toolbar>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >   
                <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={signInLink}>
                    <Avatar /> Sign in
                </MenuItem>
                <MenuItem onClick={signUpLink}>
                    <Avatar /> Sign up
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <Avatar /> Logout
                </MenuItem>
            </Menu>

        </div>
            
    );

};

export default Navbar;