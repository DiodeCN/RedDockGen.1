import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Avatar, Grid, Modal, IconButton } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';

const ChangeInformation = ({ userInfo, updateUserInfo, closeModal }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const token = sessionStorage.getItem("token") || localStorage.getItem("token")
  const userId = sessionStorage.getItem("uid");

  const [newUserInfo, setNewUserInfo] = React.useState(userInfo);
  const theme = useTheme();

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
        });
    }
  }, [token, userId]);

  return (
    <Modal
      open={true}
      onClose={closeModal}
      aria-labelledby="change-information-modal"
      aria-describedby="change-information-modal-description"
    >

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
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
            p: 2,
            backgroundSize: "cover",
            width: "450px",
            backgroundPosition: "center",
            backgroundImage:
              "linear-gradient(rgba(255,255,255), rgba(255,255,255)), url('')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: theme.shape.borderRadius,
          }}
        >
          <Grid item>
            <IconButton
              aria-label="close"
              onClick={closeModal}
              sx={{ position: "absolute", top: 0, right: 0, background: "rgba(0,0,0,0.1)", color: "black" }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Avatar
              alt="profile user"
              src={avatarUrl}
              sx={{
                width: 240,
                height: 240,
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
          <Grid item container spacing={2}>
  <Grid item xs={6}>
    <Button variant="outlined" onClick={handleSubmit} fullWidth>
      更新信息
    </Button>
  </Grid>
  <Grid item xs={6}>
    <Button variant="outlined" color="error" onClick={closeModal} fullWidth>
      取消修改
    </Button>
  </Grid>
</Grid>
</Grid>


      </Box>
    </Modal>
  );
};

export default ChangeInformation;
