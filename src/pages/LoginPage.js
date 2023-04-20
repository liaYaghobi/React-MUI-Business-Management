import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Link, TextField, Container, Typography, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useResponsive from '../hooks/useResponsive';

import { useState} from 'react';
import axios from 'axios';

import { get } from 'react-hook-form';
//import { updateAccountData } from '../_mock/account'
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 385,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 380,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));


export default function LoginPage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasError, setHasError] = useState(false);

  const mdUp = useResponsive('up', 'md');

  const handleLogin = async () => {
    try {
      
      const response = await axios.post('http://localhost:8000/user/login', { username, password });
      setIsAdmin(response.data.isAdmin);

      sessionStorage.setItem('displayName', response.data.username);
      sessionStorage.setItem('email', response.data.email);

      if (response.data.isAdmin) {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/user/ecommerce';
      }
    } catch (error) {
      setHasError(true);
      console.error(error);
    }
  };
  
  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <StyledRoot>
     

        {mdUp && (
          <StyledSection>
            <Typography variant="h4" sx={{ px: 5 }}>
              Hi, Welcome Back!
            </Typography>
            <img src="/assets/illustrations/loginImage.gif" alt="gif" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              Login
            </Typography>
            <Typography variant="h6" sx={{ ml: 'auto' }}>
              Don't have an Account?
            </Typography>
            <Link sx={{ ml: 'auto' }} href="/register" variant="subtitle2">
              Get started
            </Link>
            <div style={{ color: 'red', fontWeight: 600 }}>
                {hasError ? <div>Invalid username or password</div> : null}
            </div>
            <Divider sx={{ my: 3 }} />
            <form>
            <TextField
              style={{ width: "370px", margin: "5px" }}
              name="username"
              type="text"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              style={{ width: "370px", margin: "5px" }}
              name="password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            </form>
          
            <LoadingButton fullWidth size="large" type="submit" variant="contained"  onClick={handleLogin}>
              Login
            </LoadingButton>
     
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}