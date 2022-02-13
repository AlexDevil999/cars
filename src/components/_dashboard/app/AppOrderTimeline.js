import PropTypes from 'prop-types';
// material
import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
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
import { useEffect, useState } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------


const url = 'https://auto-leasing-bank.herokuapp.com/api/calculator/';

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

export default function AppOrderTimeline({ price }) {
  const [percent, setPercent] = useState([]);
  const [res, setRes] = useState({});
  const [payMonth, setPayMonth] = useState(0);
  const [fee, setFee] = useState(0);


  const fetchData = async () => {
    const response = await fetch(url);
    const percent = await response.json();
    setPercent(percent.percentage);
  };
  useEffect(() => {
      fetchData();
    },
    []
  );
  const handleSubmit = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: url,
        data: {
          total_sum: price,
          month: res.month,
          annual_percentage: res.annual_percentage,
          an_initial_fee: fee
        }
      });
      console.log(response.data);
    } catch (e) {

    }
  };

  const handleChange = (event) => {
    setRes(event.target.value);
  };
  const handleFee = (event) => {
    setFee(event.target.value);
  };
  console.log(fee);
  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title='Калькулятор' />
      <CardContent>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Кол-во месяцев</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={res.month}
              label='Кол-во месяцев'
              onChange={handleChange}
            >
              {
                percent != null && (
                  percent.map((p, index) => (
                    <MenuItem value={p.annual_percentage}>{p.month}</MenuItem>
                  ))
                )
              }
            </Select>
          </FormControl>
          <InputLabel id='demo-simple-select-label'>Цена</InputLabel>
          <TextField
            fullWidth
            autoComplete='price'
            type='number'
            value={price}
          />
          <InputLabel id='demo-simple-select-label'>Первоначальный взнос</InputLabel>
          <TextField
            fullWidth
            autoComplete='price'
            type='number'
            value={fee}
            onChange={handleFee}
          />
          <InputLabel id='demo-simple-select-label'>Платеж месяца</InputLabel>
          <TextField
            fullWidth
            autoComplete='price'
            type='number'
            value={payMonth}
          />
          <LoadingButton
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            onClick={handleSubmit}
          >
            Посчитать
          </LoadingButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
