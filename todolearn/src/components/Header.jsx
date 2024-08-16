import React from 'react';
import { AppBar, Toolbar, Typography, Switch, Box, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';

const Header = ({ toggleTheme, darkMode }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          codestudyhub.site
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/contacts">Contacts</Button>
          <Button color="inherit" component={Link} to="/about">About Me</Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit">
            {darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
          <Switch checked={darkMode} onChange={toggleTheme} color="default" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
