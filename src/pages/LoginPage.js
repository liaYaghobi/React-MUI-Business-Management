import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import {Checkbox, FormControlLabel, Link, TextField, Container, Typography, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useResponsive from '../hooks/useResponsive';
import Logo from '../components/logo';
import { useState} from 'react';


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

  const [userChecked, setUserChecked] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);
  const [userType, setUserType] = useState('guest');

  const mdUp = useResponsive('up', 'md');

  const handleUserChange = (event) => {
    setUserChecked(event.target.checked);
    if (event.target.checked) {
      setUserType('user');
      setAdminChecked(false);
    } else {
      setUserType('guest');
    }
  };

  const handleAdminChange = (event) => {
    setAdminChecked(event.target.checked);
    if (event.target.checked) {
      setUserType('admin');
      setUserChecked(false);
    } else {
      setUserType('guest');
    }
  };
  const handleLogin = () => {
    if(userType === 'admin'){
    window.location.href = '/dashboard';
    }
    else if(userType ==='user'){
      window.location.href = '/user/ecommerce';
    }
  };
  
  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

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
            <Divider sx={{ my: 3 }} />
            <form>
              <TextField
                style={{ width: "370px", margin: "5px" }}
                name="username"
                type="text"
                label="Username"
              />
              <TextField
                style={{ width: "370px", margin: "5px" }}
                name="password"
                type="password"
                label="Password"
              />
            </form>
            <div style={{ display: 'flex' }}>
            <FormControlLabel control={<Checkbox/>} label="User" checked={userChecked} onChange={handleUserChange}/>
            <FormControlLabel control={<Checkbox/>} label="Admin" checked={adminChecked} onChange={handleAdminChange}/>
            </div>
            <LoadingButton fullWidth size="large" type="submit" variant="contained"  onClick={handleLogin}>
              Login
            </LoadingButton>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
