import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import LandingPage from './LandingPage';
import Navbar from './customElements/navbar/Navbar';
import { DeleteButton, SearchButton } from './customElements/buttons/commonButtons';
import { Box, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, List, Paper, TextField, Typography } from '@mui/material';
import Title from './customElements/text/Title';
import EventCard from './customElements/cards/EventCards';

function VacationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { vacationData } = location.state;
  const user = useContext(AuthContext);
  const [curUser, setCurUser] = useState(Object);
  const [vacation, setVacation] = useState(Object);
  const [open, setOpen] = React.useState(false);
  const [list, setList] = useState(<List></List>);
  const url = "https://localhost:7093";

  const loadUserInfo = useCallback(async () => {
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
    })
    const getEvents = () => {
      const response = axios.get(
        url + "/vacation/Vacation/events/" + vacationData.id,
        {
          headers: {
            "ngrok-skip-browser-warning": "any" // for local ngrok development 
          }
        }
      );
      return response;
    }
    const getVacation = () => {
      const response = axios.get(
        url + "/vacation/Vacation/" + vacationData.id,
        {
          headers: {
            "ngrok-skip-browser-warning": "any" // for local ngrok development 
          }
        }
      );
      return response;
    }
    const result1 = await getEvents();
    setList(<EventCard results={result1} />);
    setVacation((await getVacation()).data);
  }, [user?.uid, vacationData.id]);

  useEffect(() => {
    loadUserInfo();
  }, [loadUserInfo]);

  const handleDelete = useCallback(async () => {
    const deleteVacation = async () => {
      await axios.delete(
        url + "/vacation/Vacation/" + vacationData.id
      ).then(() => {
        navigate("/home");
      })
    }
    deleteVacation();
  }, [navigate, vacationData.id])

  const handleSubmit = useCallback(async () => {
    const updateBalance = async () => {
      const data = {
        "vacationId": vacationData.id,
        "userUid": curUser.uid,
        "title": (document.getElementById('title') as HTMLInputElement).value,
        "cost": (document.getElementById('cost') as HTMLInputElement).value,
        "timeOfEvent": (document.getElementById('timeOfEvent') as HTMLInputElement).value,
      }
      await axios.post(
        url + "/vacation/Vacation/events",
        data
      ).then(() => {
        loadUserInfo();
        handleClose();
      })
    }
    updateBalance();
  }, [curUser.uid, loadUserInfo, vacationData.id])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <> {!user ? (<LandingPage />) : (
      <div>
        <header>
          <Navbar />
        </header>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 300,
                  }} elevation={1}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={4}>
                      <Paper
                        sx={{
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          height: 250,
                          justifyContent: "center"
                        }} elevation={10}
                      >
                        <Typography variant="h2" gutterBottom sx={{ textAlign: "center" }}>
                          {vacation.title}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={8} lg={4}>
                      <Paper
                        sx={{
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          height: 250,
                          justifyContent: "center"
                        }} elevation={10}
                      >
                        <Typography variant="h2" gutterBottom sx={{ textAlign: "center" }}>
                          Budget:
                        </Typography>
                        <Typography variant="h2" gutterBottom sx={{ textAlign: "center" }}>
                          {"$" + vacation.budget}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={8} lg={4}>
                      <Paper
                        sx={{
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          height: 250,
                          justifyContent: "center"
                        }} elevation={10}
                      >
                        <Typography variant="h2" gutterBottom sx={{ textAlign: "center" }}>
                          Depart Date:
                        </Typography>
                        <Typography variant="h2" gutterBottom sx={{ textAlign: "center" }}>
                          {vacation.departDate}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={8} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 1,
                  }} elevation={1}
                >
                  <Title>
                    My Vacations
                  </Title>
                  {list}
                  <SearchButton color='neutral' variant='contained' onClick={handleClickOpen}>Add New Event</SearchButton>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>New Vacation</DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Name this event"
                        type="text"
                        fullWidth
                        variant="standard"
                      />
                      <TextField
                        autoFocus
                        margin="dense"
                        id="cost"
                        label="Cost"
                        type='number'
                        fullWidth
                        variant="standard"
                      />
                      <TextField
                        autoFocus
                        margin="dense"
                        id="timeOfEvent"
                        label="Time of Event (MM/DD/YYYY/HH:MM)"
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
                </Paper>
              </Grid>
              <Grid item xs={12} md={8} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 1,
                  }} elevation={1}
                >
                  <DeleteButton onDoubleClick={handleDelete}>Delete Vacation (Double Click)</DeleteButton>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </div>
    )}
    </>
  );
}

export default VacationPage;