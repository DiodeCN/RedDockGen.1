import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useTheme } from "@mui/material/styles"; // Add this import

const ChangeInformation = ({ userInfo, updateUserInfo }) => {

    
  const [newUserInfo, setNewUserInfo] = React.useState(userInfo);
  const theme = useTheme(); // Add this line to use the theme

  const handleChange = (e) => {
    setNewUserInfo({ ...newUserInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    updateUserInfo(newUserInfo);
  };

  return (
    <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "background.default",
      boxShadow: theme.customShadows.z16,
      borderRadius: "12px",
      width: "450px",
      height: "450px",
      outline: "none",
      p: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      backgroundImage:
        "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}
  >
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
    </Box>
  );
};

export default ChangeInformation;
