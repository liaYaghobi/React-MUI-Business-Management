import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { FormControlLabel, Checkbox, TextField, Container, Typography, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useResponsive from '../hooks/useResponsive';

import { useState} from 'react';

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

export default function RegisterPage() {
  const mdUp = useResponsive('up', 'md');
  const [userChecked, setUserChecked] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);
  const [userType, setUserType] = useState('guest');


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
  const handleRegister = () => {
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
        <title> Register </title>
      </Helmet>

      <StyledRoot>
     

        {mdUp && (
          <StyledSection>
            <Typography variant="h4" sx={{ px: 5 }}>
              Welcome!
            </Typography>
            <img src="/assets/illustrations/registerImage.gif" alt="gif" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h3" gutterBottom>
              Create an Account
            </Typography>
            <Divider sx={{ my: 3 }}/>
            <form>
              <div style={{ display: 'flex' }}>
                <TextField
                  style={{ width: "350px", margin: "5px" }}
                  name="firstname"
                  type="text"
                  label="First Name"
                />
                <TextField
                  style={{ width: "350px", margin: "5px" }}
                  name="lastname"
                  type="text"
                  label="Last Name"
                />
              </div>
              <TextField
                style={{ width: "370px", margin: "5px" }}
                name="email"
                type="text"
                label="Email"
              />
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
              <TextField
                style={{ width: "370px", margin: "5px" }}
                name="passwordConfirm"
                type="password"
                label="Confirm Password"
              />
            </form>
            <div style={{ display: 'flex' }}>
            <FormControlLabel control={<Checkbox/>} label="User" checked={userChecked} onChange={handleUserChange}/>
            <FormControlLabel control={<Checkbox/>} label="Admin" checked={adminChecked} onChange={handleAdminChange}/>
            </div>
            <LoadingButton fullWidth size="large" type="submit" variant="contained"   onClick={handleRegister} >
              Submit
            </LoadingButton>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
