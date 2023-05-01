import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Avatar, Grid } from '@mui/material';
import { useTheme } from "@mui/material/styles"; // Add this import
import axios from "axios";

const ChangeInformation = ({ userInfo, updateUserInfo }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const token = sessionStorage.getItem("token") || localStorage.getItem("token")
  const userId = sessionStorage.getItem("uid");

  const [newUserInfo, setNewUserInfo] = React.useState(userInfo);
  const theme = useTheme(); // Add this line to use the theme

  const handleChange = (e) => {
    setNewUserInfo({ ...newUserInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    updateUserInfo(newUserInfo);
  };

  useEffect(() => {
    if (token) {
      axios
        .get(
          `https://avatar.cloudepot.cn/api/avatar/${userId}?token=${encodeURIComponent(
            token
          )}`
        )
        .then((response) => {
          setAvatarUrl(response.request.responseURL);
        })
        .catch((error) => {
          console.log("Error fetching avatar:", error);
        })
        .finally(() => {
          setIsTokenReady(true);
        });
    }
  }, [token, userId]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "background.default"
      }}
    >
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          boxShadow: theme.customShadows.z16,
          borderRadius: "12px",
          width: "450px",
          p: 2,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <Grid item>
          <Avatar
            alt="profile user"
            src={avatarUrl}
            sx={{
              width: 240,
              height: 240
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Nickname"
            name="Nickname"
            value={newUserInfo.Nickname}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            label="Introduction"
            name="Introduction"
            value={newUserInfo.Introduction}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={handleSubmit}>
            更新信息
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
  

export default ChangeInformation;
