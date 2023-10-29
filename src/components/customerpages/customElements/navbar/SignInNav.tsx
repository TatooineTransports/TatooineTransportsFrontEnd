import React from 'react';
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { palette } from '../../../../theme/pallete';
import Logo from '../../../../icons/Name_Logo.png'

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
    color: palette.black
  },
  navbar: {
    background: palette.gunmetalB
  }
}))

function SignInNav() {
  const classes = useStyles();

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
      </Toolbar>
    </AppBar>
  )
}

export default SignInNav;