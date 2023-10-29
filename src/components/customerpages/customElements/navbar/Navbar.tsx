import React from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { Theme, IconButton } from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { auth } from '../../../../auth/firebaseSetup';
import Logo from '../../../../icons/Name_Logo.png'
import { palette } from '../../../../theme/pallete';
import { NavButton } from '../buttons/NavButtons';

const useStyles = makeStyles((theme: Theme) => ({
  linkMenuStyle: {
    textDecoration: "none",
    color: palette.black
  },
  linkStyle: {
    marginRight: "1rem",
    textDecoration: "none",
    color: palette.black
  },
  homeButtonStyle: {
    textDecoration: "none",
    color: palette.white, 
  },
  navbar: {
    background: palette.gunmetalB
  }
}))

function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = async () => {
    await auth.signOut();
    window.open('/', '_self')
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }} className={classes.navbar}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          
          <Link className={classes.homeButtonStyle} to='/home'>
            Hi
          </Link>
        </Typography>
        <nav>
          <Link type='button' className={classes.linkStyle}
            to="/contact"
          >
            <NavButton variant='contained'>Contact</NavButton>
          </Link>
          <Link className={classes.linkStyle}
            to="/search"
          >
            <NavButton variant='contained'>Search</NavButton>
          </Link>
        </nav>
        <IconButton aria-label="profile" onClick={handleClick}>
          <AccountBoxIcon sx={{ color: palette.white }}/>
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <Link className={classes.linkMenuStyle}
            to="/profile"
          >
            <MenuItem>Profile</MenuItem>
          </Link>
          <Link className={classes.linkMenuStyle}
            to="/payments"
          >
            <MenuItem>Payments</MenuItem>
          </Link>
          <Divider />
          <MenuItem onClick={signOut}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;