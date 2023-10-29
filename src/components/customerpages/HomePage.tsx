import { useContext } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { AuthContext } from '../../context/AuthContext';
import LandingPage from './LandingPage';
import Navbar from './customElements/navbar/Navbar';
import FavAdvCard from './customElements/cards/VacationsCard';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '-ms-overflow-style': 'none',
    scrollbarWidth: 'none',
  },
});

function HomePage() {

  const classes = useStyles();
  const user = useContext(AuthContext);
  //const url = "https://localhost:7093"//"https://93e4-104-54-111-86.ngrok-free.app"

  return (
    <> {!user ? (<LandingPage />) : (

      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <Box
          className={classes.root}
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
              <Grid item xs={12}>
                <Paper sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 500
                }}>
                  <FavAdvCard />
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

export default HomePage;