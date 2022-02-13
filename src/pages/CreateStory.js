// material
import { Box, Container, Grid, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { AppNewsUpdate, AppOrderTimeline, AppWeeklySales } from '../components/_dashboard/app';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CreateStore from '../components/_dashboard/app/CreateStore';

// ----------------------------------------------------------------------

export default function CreateStory() {

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
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}>
            <CreateStore />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
