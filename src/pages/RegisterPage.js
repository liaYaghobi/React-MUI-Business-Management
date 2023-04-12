import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { TextField, Container, Typography, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useResponsive from '../hooks/useResponsive';
import Logo from '../components/logo';

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

  return (
    <>
      <Helmet>
        <title> Register </title>
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
            <LoadingButton fullWidth size="large" type="submit" variant="contained" >
              Submit
            </LoadingButton>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
