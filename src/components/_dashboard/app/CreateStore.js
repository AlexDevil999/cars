import PropTypes from 'prop-types';
// material
import { Card, CardContent, CardHeader, InputLabel, Stack, TextField, Typography } from '@mui/material';
import {
  LoadingButton,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator
} from '@mui/lab';
// utils
import { fDateTime } from '../../../utils/formatTime';
import { useState } from 'react';
import FileUpload from 'react-material-file-upload';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// ----------------------------------------------------------------------


const url = 'https://auto-leasing-bank.herokuapp.com/api/auto/';

OrderItem.propTypes = {
  item: PropTypes.object,
  isLast: PropTypes.bool
};

function OrderItem({ item, isLast }) {
  const { type, title, time } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            bgcolor:
              (type === 'order1' && 'primary.main') ||
              (type === 'order2' && 'success.main') ||
              (type === 'order3' && 'info.main') ||
              (type === 'order4' && 'warning.main') ||
              'error.main'
          }}
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant='subtitle2'>{title}</Typography>
        <Typography variant='caption' sx={{ color: 'text.secondary' }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

export default function CreateStore() {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({
    city: '',
    brand: '',
    mark: '',
    year: '',
    steering_wheel: '',
    drive_unit: '',
    volume: '',
    fuel: '',
    body: '',
    box: '',
    price: '',
    color: '',
    mileage: '12',
    description: '',
    images: ['https://autoleasing.s3.amazonaws.com/uploads/auto/5459ba01-5248-4f07-90ef-36b6a781fc8e.jpg'],
    date_created: '2021-12-27T18:10:24.056Z',
    user: '46'
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const schema = Yup.object().shape({});

  const formik = useFormik({
    initialValues: {},
    validationSchema: schema,
    onSubmit: async () => {
      const response = await axios({
        method: 'POST',
        url: url,
        data: {
          ...form
        }
      });
      navigate('/dashboard/cars', { replace: true });
    }
  });
  const { handleSubmit } = formik;

  return (

    <FormikProvider value={formik}>
      <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Card
          sx={{
            '& .MuiTimelineItem-missingOppositeContent:before': {
              display: 'none'
            }
          }}
        >
          <CardHeader title='Создать обьявление' />
          <CardContent>
            <Stack spacing={3}>
              <InputLabel id='demo-simple-select-label'>Город</InputLabel>
              <TextField
                fullWidth
                autoComplete='city'
                name='city'
                type='text'
                value={form.city}
                onChange={handleChange}
              />
              <InputLabel id='demo-simple-select-label'>Бренд</InputLabel>
              <TextField
                fullWidth
                autoComplete='brand'
                type='text'
                name='brand'
                value={form.brand}
                onChange={handleChange}
              />
              <InputLabel id='demo-simple-select-label'>Марка</InputLabel>
              <TextField
                fullWidth
                autoComplete='mark'
                name='mark'
                type='text'
                value={form.mark}
                onChange={handleChange}
              />
              <InputLabel id='demo-simple-select-label'>Год</InputLabel>
              <TextField
                fullWidth
                autoComplete='year'
                name='year'
                type='number'
                value={form.year}
                onChange={handleChange}
              />
              <InputLabel id='demo-simple-select-label'>Руль</InputLabel>
              <TextField
                fullWidth
                autoComplete='steering_wheel'
                type='text'
                name='steering_wheel'
                value={form.steering_wheel}
                onChange={handleChange}
              />
              <InputLabel id='demo-simple-select-label'>Привод</InputLabel>
              <TextField
                fullWidth
                autoComplete='drive_unit'
                type='text'
                name='drive_unit'
                value={form.drive_unit}
                onChange={handleChange}
              />
              <InputLabel id='demo-simple-select-label'>Обьем</InputLabel>
              <TextField
                fullWidth
                autoComplete='volume'
                type='text'
                name='volume'
                value={form.volume}
                onChange={handleChange}
              />
              <InputLabel id='demo-simple-select-label'>Толиво</InputLabel>
              <TextField
                fullWidth
                autoComplete='fuel'
                type='text'
                name='fuel'
                value={form.fuel}
                onChange={handleChange}
              />
              <InputLabel id='demo-simple-select-label'>Кузов</InputLabel>
              <TextField
                fullWidth
                autoComplete='body'
                type='text'
                name='body'
                value={form.body}
                onChange={handleChange}
              />
              <InputLabel id='demo-simple-select-label'>Коробка</InputLabel>
              <TextField
                fullWidth
                autoComplete='box'
                type='text'
                name='box'
                value={form.box}
                onChange={handleChange}
              />
              <InputLabel id='demo-simple-select-label'>Цена</InputLabel>
              <TextField
                fullWidth
                autoComplete='price'
                type='number'
                name='price'
                value={form.price}
                onChange={handleChange}
              />
              <InputLabel id='demo-simple-select-label'>Цвет</InputLabel>
              <TextField
                fullWidth
                autoComplete='color'
                type='text'
                name='color'
                value={form.color}
                onChange={handleChange}
              />
              <FileUpload value={files} onChange={setFiles} />
              <LoadingButton
                fullWidth
                size='large'
                type='submit'
                variant='contained'
                // onClick={handleSubmit}
              >
                Создать
              </LoadingButton>
            </Stack>
          </CardContent>
        </Card>
      </Form>
    </FormikProvider>
  );
}
