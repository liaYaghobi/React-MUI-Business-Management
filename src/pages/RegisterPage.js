import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { TextField, Container, Typography, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useResponsive from '../hooks/useResponsive';

import { useState } from 'react';
import axios from 'axios';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 375,
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
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    isAdmin: false,
    //passwordConfirm: ""
  });

  const [hasError, setHasError] = useState(false);
  
  function validateFormData(formData) {
    for (const key in formData) {
      if (formData[key] === "") {
        return false;
      }
    }
    return true;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validateFormData(formData)) {
      try {
        const response = await axios.post('http://localhost:8000/user/register', formData);
         
      sessionStorage.setItem('displayName', formData.username);
      sessionStorage.setItem('email', formData.email);

      if (formData.isAdmin) {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/user/ecommerce';
      }

      } catch (error) {
        console.error(error);
        //handle error here
      }
    } else {
      setHasError(true);
    }
  };
  

  const mdUp = useResponsive('up', 'md');

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
            <Typography variant="h4" gutterBottom>
              Create an Account
            </Typography>
            <Divider sx={{ my: 2 }}/>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex' }}>
                <TextField
                  style={{ width: "350px", margin: "5px" }}
                  name="firstname"
                  type="text"
                  label="First Name"
                  value={formData.firstname}
                  onChange={(e) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      firstname: e.target.value,
                    }))
                  }
                />
                <TextField
                  style={{ width: "350px", margin: "5px" }}
                  name="lastname"
                  type="text"
                  label="Last Name"
                  value={formData.lastname}
                  onChange={(e) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      lastname: e.target.value,
                    }))
                  }
                />
              </div>
              <TextField
                style={{ width: "370px", margin: "5px" }}
                name="email"
                type="text"
                label="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    email: e.target.value,
                  }))
                }
              />
              <TextField
                style={{ width: "370px", margin: "5px" }}
                name="username"
                type="text"
                label="Username"
                value={formData.username}
                  onChange={(e) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      username: e.target.value,
                    }))
                  }
              />
              <TextField
                style={{ width: "370px", margin: "5px" }}
                name="password"
                type="password"
                label="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    password: e.target.value,
                  }))
                }
              />
              <TextField
                style={{ width: "370px", margin: "5px" }}
                name="passwordConfirm"
                type="password"
                label="Confirm Password"
              />
              <input   style={{ marginTop: '13px'}}
                type="checkbox" 
                id="isAdmin" 
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    isAdmin: e.target.checked,
                  }))
              }/>
              <label htmlFor="isAdmin" style={{ fontSize: '16px', marginTop: '13px'}}>Admin</label>
              <div style={{ color: 'red', fontWeight: 600 }}>
                {hasError ? <div>Please fill out all the fields!</div> : null}
            </div>
              <LoadingButton sx={{ mt: 2, mb: 2 }} fullWidth size="large" type="submit" variant="contained" >
              Submit
              </LoadingButton>
            </form>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}