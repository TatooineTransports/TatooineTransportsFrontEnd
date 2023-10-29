import { useState } from 'react';
import { Button, TextField, Container, Box, Avatar } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { createNewAccount, emailPassSignIn } from '../../auth/authUserLogic';
import SignInNav from './customElements/navbar/SignInNav';

function LandingPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isSame, setIsSame] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [helperText, setHelperText] = useState("");

  const defaultTheme = createTheme();

  const newUser = () => {
    setIsSignIn(!isSignIn);
  }

  const verifyPass = () => {
    const pass = (document.getElementById('passwordInput') as HTMLInputElement);
    const passconfirm = (document.getElementById('confirmPassInput') as HTMLFormElement);
    if (pass.value !== passconfirm.value) {
      setIsSame(true);
      setHelperText("Passwords don't match")
      setIsVerified(true);
    } else {
      setIsSame(false);
      setHelperText("");
      setIsVerified(false);
    }
  }

  const createAccountButton = async () => {
    try {
      const data = {
        "uid": "",
        "userName": (document.getElementById('userNameInput') as HTMLInputElement).value,
        "phoneNum": "+1" + (document.getElementById('phoneInput') as HTMLInputElement).value,
        "email": (document.getElementById('emailInput') as HTMLInputElement).value,
        "favorites": ["new"],
        "balance" : 0
      }
      createNewAccount(data);
    } catch (error) {
      console.error(error);
    }
  };

  const signIn = async () => {
    emailPassSignIn((document.getElementById('emailInput') as HTMLInputElement).value,
      (document.getElementById('passInput') as HTMLInputElement).value);
  };

  return (
    <> {isSignIn ? (
      <ThemeProvider theme={defaultTheme}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <SignInNav />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <TextField
            fullWidth
            margin='normal'
            variant='outlined'
            id='emailInput'
            label='Email'
            type='email'
          />
          <TextField
            fullWidth
            margin='normal'
            variant='outlined'
            id='passInput'
            label='Password'
            type='password' />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={signIn}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 0, mb: 2 }}
            onClick={newUser}
          >
            Sign Up
          </Button>
        </Box>
      </Container>
      </ThemeProvider>
    ) : (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <AutoFixHighIcon />
          </Avatar>
          <TextField
            fullWidth
            margin='normal'
            variant='outlined'
            id='userNameInput'
            label='Username'
          />
          <TextField
            fullWidth
            margin='normal'
            variant='outlined'
            id='phoneInput'
            label='Phone ex:5615555555'
          />
          <TextField
            fullWidth
            margin='normal'
            variant='outlined'
            id='emailInput'
            label='Email'
          />
          <TextField
            fullWidth
            margin='normal'
            variant='outlined'
            id='passwordInput'
            type='password'
            onChange={verifyPass}
            label='Password'
          />
          <TextField
            fullWidth
            margin='normal'
            variant='outlined'
            id='confirmPassInput'
            onChange={verifyPass}
            type='password'
            error={isSame}
            helperText={helperText}
            label='Confirm Password'
          />
          <Button
            fullWidth
            type="submit"
            sx={{ mt: 3, mb: 2 }}
            variant='contained'
            disabled={isVerified}
            onClick={createAccountButton}
          >
            Create Profile.
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 0, mb: 2 }}
            onClick={newUser}
          >
            Already Have an account : Sign in
          </Button>
        </Box>
      </Container>
    )}
    </>
  );
}

export default LandingPage;