import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link, Link as RouterLink, NavLink } from 'react-router-dom';
// material
import { Button, Container, Grid, Stack, TablePagination, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import React, { useEffect, useState } from 'react';
import { BlogPostCard, BlogPostsSearch, BlogPostsSort } from '../components/_dashboard/blog';
//
import POSTS from '../_mocks_/blog';

const url = 'https://auto-leasing-bank.herokuapp.com/api/auto/';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------


export default function PageCars() {

  const [cars, setCars] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const fetchCountryData = async () => {
    const response = await fetch(url);
    const cars = await response.json();
    setCars(cars);
  };
  useEffect(() => {
      fetchCountryData();
    },
    []
  );
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cars.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Page title='InvesCoreAuto'>
      <Container>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
          <Typography variant='h4' gutterBottom>
            Новинки машин
          </Typography>
          <Button
            variant='contained'
            component={RouterLink}
            to='/dashboard/create'
            startIcon={<Icon icon={plusFill} />}
          >
            Добавить обьявление
          </Button>
        </Stack>

        <Stack mb={5} direction='row' alignItems='center' justifyContent='space-between'>
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {cars.map((car, index) => (
              <BlogPostCard key={car.id} post={car} index={index} link={`/dashboard/${car.id}`} />
          ))}
        </Grid>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={cars.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </Page>
  );
}
