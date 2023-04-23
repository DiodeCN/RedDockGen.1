import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();
  const responseStatus = localStorage.getItem('responseStatus');
  const defaultMessage = '这里是默认事件代码 如果您看到这个 说明见鬼了';
  const errorMessage = responseStatus
    ? `错误信息：${responseStatus}`
    : defaultMessage;

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h1" component="h1" gutterBottom>
          404😡
        </Typography>
        <Typography variant="h2" component="h2" gutterBottom>
          有些地方出了问题🥹
        </Typography>
        <Typography variant="h2" component="h2" gutterBottom>
          {errorMessage}🥳
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
          >
            寻找帮助
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PageNotFound;
