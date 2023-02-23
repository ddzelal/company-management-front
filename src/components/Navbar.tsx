import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

  const navigate = useNavigate()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate('/')}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Company Menagment
          </Typography>
          <Button onClick={() => navigate('/create-comapny')} color="inherit">Create Company</Button>
          <Button onClick={() => navigate('/search-comapny')} color="inherit">Search Company</Button>
          <Button onClick={() => navigate('/create-invoice')} color="inherit">Create Invoice</Button>
          <Button onClick={() => navigate('/search-invoice')} color="inherit">Search Invoice</Button>

        </Toolbar>
      </AppBar>
    </Box>
  );
}