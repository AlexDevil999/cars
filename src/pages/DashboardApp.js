// material
import { Box, Container, Grid, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { AppNewsUpdate, AppOrderTimeline, AppWeeklySales } from '../components/_dashboard/app';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function DashboardApp() {

  const { id } = useParams();
  const [car, setCar] = useState({});
  const [image, setImage] = useState([]);

  useEffect(() => {
    axios
      .get(`https://auto-leasing-bank.herokuapp.com/api/auto/${id}/`)
      .then(response => {
        setCar(response.data);
        setImage(response.data.images);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  console.log(car);
  return (
    <Page title='Car'>
      <Container maxWidth='xl'>
        <Box sx={{ pb: 5 }}>
          <Typography variant='h4'>{car.brand}</Typography>
        </Box>
        <Box sx={{ pb: 5 }}>
          <Typography variant='h4'>{car.mark}</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales text={`Топливо`} info={car.fuel} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales car={car} text={`Цена`} info={car.price} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales car={car} text={`Год выпуска`} info={car.year} />

          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales car={car} text={`Пробег`} info={car.mileage} />
          </Grid>

          {/*<Grid item xs={12} md={6} lg={8}>*/}
          {/*  <AppWebsiteVisits />*/}
          {/*</Grid>*/}

          {/*<Grid item xs={12} md={6} lg={4}>*/}
          {/*  <AppCurrentVisits />*/}
          {/*</Grid>*/}

          {/*<Grid item xs={12} md={6} lg={8}>*/}
          {/*  <AppConversionRates />*/}
          {/*</Grid>*/}

          {/*<Grid item xs={12} md={6} lg={4}>*/}
          {/*  <AppCurrentSubject />*/}
          {/*</Grid>*/}

          <Grid item xs={12} md={6} lg={6}>
            <AppNewsUpdate images={car.images} />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppOrderTimeline price={car.price} />
          </Grid>

          {/*<Grid item xs={12} md={6} lg={4}>*/}
          {/*  <AppTrafficBySite />*/}
          {/*</Grid>*/}

          {/*<Grid item xs={12} md={6} lg={8}>*/}
          {/*  <AppTasks />*/}
          {/*</Grid>*/}
        </Grid>
      </Container>
    </Page>
  );
}
