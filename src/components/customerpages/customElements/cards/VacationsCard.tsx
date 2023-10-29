import * as React from 'react';
import Title from '../text/Title';
import List from '@mui/material/List';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import SearchCard from './searchCards';
import { AuthContext } from '../../../../context/AuthContext';
import { palette } from '../../../../theme/pallete';
import { SearchButton } from '../buttons/commonButtons';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';

export default function FavAdvCard() {
  const [list, setList] = useState(<List></List>);
  const user = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [curUser, setCurUser] = useState(Object);

  const url = "https://localhost:7093";

  const loadUserInfo = useCallback(async () => {
    const getCurrentUser = () => {
      const uid = user?.uid;
    axios.get(
        url + "/user/User/" + uid?.toString(),
        {
          headers: {
            "ngrok-skip-browser-warning": "any" // for local ngrok development 
          }
        }
      ).then(response => {
        setCurUser(response.data)
      });

    }
    const getVacations = () => {
      const response = axios.get(
        url + "/vacation/Vacation/" + user?.uid + "/vacations",
        {
          headers: {
            "ngrok-skip-browser-warning": "any" // for local ngrok development 
          }
        }
      );
      return response;
    }
    getCurrentUser();
    const result1 = await getVacations();
    setList(<SearchCard results={result1} />)
  }, [user])

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
    const updateBalance = async () => {
      const data = {
        "userUid": curUser.uid,
        "title": (document.getElementById('title') as HTMLInputElement).value,
        "budget": (document.getElementById('budget') as HTMLInputElement).value,
        "departDate": (document.getElementById('departDate') as HTMLInputElement).value,
      }
      await axios.post(
        url + "/vacation/Vacation",
        data
      ).then(() => {
        loadUserInfo();
        handleClose();
      })
    }
    updateBalance();
  }, [curUser.uid, loadUserInfo])

  return (
    <React.Fragment>
      <TravelExploreIcon sx={{ color: palette.gunmetalB }} />
      <Title>
        My Vacations
      </Title>
      {list}
      <SearchButton color='neutral' variant='contained' onClick={handleClickOpen}>Add New Vacation</SearchButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Vacation</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Name this vacation"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="budget"
            label="Budget"
            type='number'
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="departDate"
            label="Depart Date (MM/DD/YYYY)"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <SearchButton onClick={handleClose}>Cancel</SearchButton>
          <SearchButton onClick={handleSubmit}>Submit</SearchButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}