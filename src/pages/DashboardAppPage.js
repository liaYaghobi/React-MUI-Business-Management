import { Helmet } from 'react-helmet-async';
import { Container, Grid , Typography} from '@mui/material';
import { AppCalendar } from '../sections/@dashboard/app';

export default function DashboardAppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          </Grid>
          <Grid item xs={12}>
            <AppCalendar />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}