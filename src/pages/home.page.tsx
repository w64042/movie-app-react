import { Box, Container, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <Container
      maxWidth={false}
      sx={{ backgroundColor: '#1b1b1b', minHeight: '100vh', pt: '5rem' }}
    >
      <Box
        maxWidth='md'
        sx={{
          backgroundColor: '#ece9e9',
          height: '15rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
        }}
      >
        <Typography
          variant='h2'
          component='h1'
          sx={{ color: '#222', fontWeight: 500 }}
        >
          Co dzisiaj robimy?
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
