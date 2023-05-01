import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const ChangeInformation = ({ userInfo, updateUserInfo }) => {
  const [newUserInfo, setNewUserInfo] = React.useState(userInfo);

  const handleChange = (e) => {
    setNewUserInfo({ ...newUserInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    updateUserInfo(newUserInfo);
  };

  return (
    <Box>
      <TextField
        label="Nickname"
        name="Nickname"
        value={newUserInfo.Nickname}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Introduction"
        name="Introduction"
        value={newUserInfo.Introduction}
        onChange={handleChange}
        fullWidth
      />
      <Button variant="outlined" onClick={handleSubmit}>
        更新信息
      </Button>
    </Box>
  );
};

export default ChangeInformation;
