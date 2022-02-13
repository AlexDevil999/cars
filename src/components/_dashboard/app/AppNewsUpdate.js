import faker from 'faker';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, ImageList, ImageListItem, Link, Stack, Typography } from '@mui/material';
// utils
import { mockImgCover } from '../../../utils/mockImages';
//

// ----------------------------------------------------------------------

const NEWS = [...Array(5)].map((_, index) => {
  const setIndex = index + 1;
  return {
    title: faker.name.title(),
    description: faker.lorem.paragraphs(),
    image: mockImgCover(setIndex),
    postedAt: faker.date.soon()
  };
});

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.object.isRequired
};

function NewsItem({ news }) {
  const { image, title, description, postedAt } = news;

  return (
    <Stack direction='row' alignItems='center' spacing={2}>
      <Box
        component='img'
        alt={title}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5 }}
      />
      <Box sx={{ minWidth: 240 }}>
        <Link to='#' color='inherit' underline='hover' component={RouterLink}>
          <Typography variant='subtitle2' noWrap>
            {title}
          </Typography>
        </Link>
        <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>
      <Typography variant='caption' sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {formatDistance(postedAt, new Date())}
      </Typography>
    </Stack>
  );
}

export default function AppNewsUpdate({ images }) {
  return (
    <Card>
      {images != null && (
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {
            images.map((img, index) => (
              <ImageListItem key={index}>
                <img
                  src={`${img}`}
                  srcSet={`${img}`}
                  alt={index}
                  loading='lazy'
                />
              </ImageListItem>
            ))}
        </ImageList>
        )
      }
    </Card>
  );
}
