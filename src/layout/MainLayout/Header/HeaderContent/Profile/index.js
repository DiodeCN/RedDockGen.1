import PropTypes from "prop-types";
import axios from "axios";
import { useRef, useState, useEffect } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Grid,
  IconButton,
  Paper,
  Popper,
  Stack,
  Tab,
  Tabs,
  Typography,
  Modal,
  Button
} from "@mui/material";

import { Close } from "@mui/icons-material";

// project import
import MainCard from "components/MainCard";
import Transitions from "components/@extended/Transitions";
import ProfileTab from "./ProfileTab";
import SettingTab from "./SettingTab";

// assets
import avatar1 from "assets/images/users/avatar-1.png";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined
} from "@ant-design/icons";

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    "aria-controls": `profile-tabpanel-${index}`
  };
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
  const theme = useTheme();
  const userId = sessionStorage.getItem("uid");
  const [token, setToken] = useState(
    sessionStorage.getItem("token") || localStorage.getItem("token")
  );
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isTokenReady, setIsTokenReady] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAvatarClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
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

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const iconBackColorOpen = "grey.300";

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : "transparent",
          borderRadius: 1,
          "&:hover": { bgcolor: "secondary.lighter" }
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Modal
          open={isModalOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          onClick={(e) => e.stopPropagation()}
        >
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
              height: "420px",
              opacity: 0.72,
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
            <IconButton
              aria-label="close modal"
              onClick={(event) => {
                event.stopPropagation();
                handleModalClose();
              }}
              sx={{ position: "absolute", top: "8px", right: "8px" }}
            >
              <Close />
            </IconButton>

            <Avatar
              alt="profile user"
              src={avatarUrl}
              sx={{
                width: 240,
                height: 240,
                opacity: 0.9 //添加opacity属性
              }}
            />
            <Typography variant="h3" id="modal-title">
              用户名
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={handleAvatarClick}
              sx={{ width: "100%" }}
            >
              上传头像
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={handleAvatarClick}
              sx={{ width: "100%" }}
            >
              随机头像
            </Button>
          </Box>
        </Modal>

        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar
            alt="profile user"
            src={avatarUrl}
            sx={{ width: 38, height: 38 }}
            onClick={handleAvatarClick}
          />
          <Typography variant="subtitle1">用户名</Typography>
        </Stack>
      </ButtonBase>

      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  boxShadow: theme.customShadows.z1,
                  width: 290,
                  minWidth: 240,
                  maxWidth: 290,
                  [theme.breakpoints.down("md")]: {
                    maxWidth: 250
                  }
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    <CardContent sx={{ px: 2.5, pt: 3 }}>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid item>
                          <Stack
                            direction="row"
                            spacing={1.25}
                            alignItems="center"
                          >
                            <ButtonBase onClick={handleAvatarClick}>
                              <Avatar
                                alt="profile user"
                                src={avatarUrl}
                                sx={{ width: 48, height: 48 }}
                              />
                            </ButtonBase>

                            <Stack>
                              <Typography variant="h6">用户名</Typography>
                              <Typography variant="body2" color="textSecondary">
                                个人简介
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid item>
                          <IconButton
                            size="large"
                            color="secondary"
                            onClick={handleLogout}
                          >
                            <LogoutOutlined />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardContent>
                    {open && (
                      <>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <Tabs
                            variant="fullWidth"
                            value={value}
                            onChange={handleChange}
                            aria-label="profile tabs"
                          >
                            <Tab
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                textTransform: "capitalize"
                              }}
                              icon={
                                <UserOutlined
                                  style={{
                                    marginBottom: 0,
                                    marginRight: "10px"
                                  }}
                                />
                              }
                              label="资料"
                              {...a11yProps(0)}
                            />
                            <Tab
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                textTransform: "capitalize"
                              }}
                              icon={
                                <SettingOutlined
                                  style={{
                                    marginBottom: 0,
                                    marginRight: "10px"
                                  }}
                                />
                              }
                              label="设置"
                              {...a11yProps(1)}
                            />
                          </Tabs>
                        </Box>
                        <TabPanel value={value} index={0} dir={theme.direction}>
                          <ProfileTab handleLogout={handleLogout} />
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                          <SettingTab />
                        </TabPanel>
                      </>
                    )}
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
