import React from 'react';
import {Link,useNavigate} from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const configurationsOptions = [
  'Utilisateurs',
  'Administration',
  'Produits'
];

const navConfigurations = {
  0: '/admin/users',
  1: '/',
  2: '/',
};


const Navbar = () => {

  
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    navigate(navConfigurations[index]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List component="nav" aria-label="Device settings" sx={{ bgcolor: '#FFFFFF' }} style={{ padding:0, margin: 0 }}>
        <ListItemButton 
          id="lock-button" aria-label="Configuration" aria-expanded={open ? 'true' : undefined} onClick={handleClickListItem} 
          aria-haspopup="listbox" aria-controls="lock-menu"
        >
          <ListItemText primary="Configuration" secondary={configurationsOptions[selectedIndex]} />
        </ListItemButton>
      </List>
      <Menu id="lock-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{'aria-labelledby': 'lock-button',role: 'listbox'}} >
        {configurationsOptions.map((option, index) => (
          <MenuItem key={option} selected={index === selectedIndex} onClick={(event) => handleMenuItemClick(event, index)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default Navbar;