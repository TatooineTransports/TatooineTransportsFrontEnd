import React from 'react';
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { Avatar, Box, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField, Theme, Typography } from '@mui/material';
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import LandingPage from './LandingPage';
import Navbar from './customElements/navbar/Navbar';
import { SearchButton } from './customElements/buttons/commonButtons';
import { useNavigate } from 'react-router-dom';
//import { auth } from '../../auth/firebaseSetup';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    padding: '4',
    width: 70,
    color: theme.palette.grey[700]
  },
  body: {
    background: theme.palette.common.white
  },
  list: {
    maxHeight: '90vh',
    overflow: 'auto',
    scrollbars: 'none'
  },
  listItem: {
    border: 'solid',
    borderTop: 'hidden',
    borderWidth: '1px',
    borderColor: theme.palette.primary.main
  },
  listItemText: {
    width: '100%',
    minWidth: '500',
    maxWidth: '700'
  },
  listIemButton: {
    background: theme.palette.primary.light,
    alignSelf: 'flex-end',
    '&hover': {
      background: theme.palette.primary.dark
    }
  }

}))

function ProfilePage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [curUser, setCurUser] = useState(Object);
  const [open, setOpen] = React.useState(false);
  const user = useContext(AuthContext);
  const url = "https://93e4-104-54-111-86.ngrok-free.app"

  const loadUserInfo = useCallback(async () => {
      const uid = user?.uid;
      axios.get(
        url + "/customer/customerUID/" + uid?.toString(),
        {
          headers: {
            "ngrok-skip-browser-warning": "any" // for local ngrok development 
          }
        }
      ).then(response => {
        console.log(response.data.userName)
        if (response.data.psy === true) {
          navigate("/54676/a");
        }
        setCurUser(response.data)
      });
  }, [navigate, user?.uid])

  useEffect(() => {
    loadUserInfo();
  }, [loadUserInfo])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = useCallback(async () => {
    const updateUserInfo = async () => {
      const data = {
        "uid": curUser.uid,
        "userName": (document.getElementById('UserName') as HTMLInputElement).value,
        "firstName": (document.getElementById('FirstName') as HTMLInputElement).value,
        "lastName": (document.getElementById('LastName') as HTMLInputElement).value,
        "phoneNum": (document.getElementById('Phone') as HTMLInputElement).value,
        "email": curUser.email,
        "favorites": curUser.favorites,
        "balance": curUser.balance,
        "avatarUrl": (document.getElementById('AvatarURL') as HTMLInputElement).value
      }
      await axios.post(
        url + "/customer/updateUserInfo",
        data
      ).then(() => {
        loadUserInfo();
        setOpen(false);
      })
    }
    updateUserInfo();
  }, [curUser, loadUserInfo])


  return (
    <> {!user ? (<LandingPage />) : (
      <div className="App">
        <div className={classes.body}>
          <header>
            <Navbar />
          </header>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <Avatar alt="Profile Avatar" src={curUser.avatarUrl} sx={{ width: 100, height: 100 }} />
            <Typography variant="h5" sx={{ mt: 2 }}>
              {curUser.userName}
            </Typography>
            <Divider sx={{ mt: 2, mb: 2, width: '80%' }} />
            <Typography variant="body1">
              <strong>Phone:</strong> {curUser.phoneNum}
            </Typography>
            <Typography variant="body1">
              <strong>Name:</strong> {curUser.firstName + " " + curUser.lastName}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {curUser.email}
            </Typography>
            <SearchButton variant="outlined" onClick={handleClickOpen}>
              Edit Profile
            </SearchButton>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="UserName"
                  label="Userame"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={curUser.userName}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="Phone"
                  label="Phone ex:+15615555555"
                  type="phone"
                  fullWidth
                  variant="standard"
                  defaultValue={curUser.phoneNum}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="FirstName"
                  label="First Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={curUser.firstName}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="LastName"
                  label="Last Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={curUser.lastName}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="AvatarURL"
                  label="Profile Picture URL"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={curUser.avatarUrl}
                />
              </DialogContent>
              <DialogActions>
                <SearchButton onClick={handleClose}>Cancel</SearchButton>
                <SearchButton onClick={handleSubmit}>Submit</SearchButton>
              </DialogActions>
            </Dialog>
          </Box>
        </div>

      </div>
    )
    }
    </>
  );
}

export default ProfilePage;