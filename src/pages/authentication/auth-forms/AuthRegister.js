import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";

// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Alert,
  Snackbar
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project import
import AnimateButton from "components/@extended/AnimateButton";
import { strengthColor, strengthIndicator } from "utils/password-strength";

// assets
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
  const navigate = useNavigate();
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [verificationButtonDisabled, setVerificationButtonDisabled] =
    useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "注册成功 将在三秒后跳转",
    severity: "success"
  });
  const [timeLeft, setTimeLeft] = useState(0);


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  const api = axios.create({
    baseURL: "https://api.cloudepot.cn/"
  });

  const CustomAlert = React.forwardRef((props, ref) => {
    return <Alert ref={ref} elevation={6} variant="filled" {...props} />;
  });

  useEffect(() => {
    let timer;
  
    if (timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      const sentAt = localStorage.getItem("verificationCodeSentAt");
      if (sentAt) {
        const elapsedTime = Math.floor((Date.now() - sentAt) / 1000);
        if (elapsedTime < 60) {
          setTimeLeft(60 - elapsedTime);
          setVerificationButtonDisabled(true);
        } else {
          setVerificationButtonDisabled(false);
        }
      } else {
        setVerificationButtonDisabled(false);
      }
    }
  
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timeLeft]);
  
  

  
  const sendVerificationCode = async (phoneNumber) => {
    setSnackbar({
      open: true,
      message: "如果您正确填写电话号 那么您将收到六位数的验证码",
      severity: "success"
    });
    setTimeLeft(60);
    localStorage.setItem("verificationCodeSentAt", Date.now()); // 添加这一行
    try {
      await api.post("/api/send_VC", { phoneNumber: "+86" + phoneNumber });
    } catch (error) {
      console.error("Failed to send verification code:", error);
      setVerificationButtonDisabled(false);
    }
  };

  const registerUser = async (data) => {
    try {
      console.log("Sending data:", data);

      const response = await api.post("/api/register", {
        nickname: data.nickname,
        inviter: "#" + data.inviter,
        phoneNumber: "+86" + data.phoneNumber,
        verificationCode: data.verificationCode,
        password: data.password
      });

      console.log("Response:", response.data);

      if (response.data.message === "user_registered_successfully") {
        localStorage.setItem("token", response.data.token); // 添加这一行来存储 token
        setSnackbar({
          open: true,
          message: "注册成功",
          severity: "success"
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        setSnackbar({
          open: true,
          message: "未知错误",
          severity: "error"
        });
      }
    } catch (error) {
      console.error("Failed to register user:", error);

      // 调试：在控制台中打印错误响应
      console.log("Error response:", error.response);

      // 获取错误响应的 message 属性，如果没有则设置为 "未知错误"
      const errorMessage =
        error.response?.data?.message || "邀请人|验证码错误 或本电话号已被注册";

      // 检查错误状态码是否为 400
      if (error.response?.status === 400) {
        // 在此处处理 400 错误
        setSnackbar({
          open: true,
          message: errorMessage, // 使用错误响应中的 message，或者自定义一个错误消息
          severity: "error"
        });
      } else {
        setSnackbar({
          open: true,
          message: errorMessage,
          severity: "error"
        });
      }
    }
  };

  useEffect(() => {
    changePassword("");
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          nickname: "",
          inviter: "",
          phoneNumber: "",
          verificationCode: "",
          password: "",
          submit: null
        }}
        validationSchema={Yup.object().shape({
          nickname: Yup.string().max(255).required("昵称是必填项。"),
          inviter: Yup.string().max(255).required("邀请人是必填项。"),
          phoneNumber: Yup.string().required("电话是必填项。"),
          verificationCode: Yup.string().required("验证码是必填项。"),
          password: Yup.string().max(255).required("密码是必填项。")
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false });
            await registerUser(values);
            setSubmitting(false);
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <InputLabel htmlFor="nickname-signup">昵称</InputLabel>
                <OutlinedInput
                  id="nickname-signup"
                  type="text"
                  value={values.nickname}
                  name="nickname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  fullWidth
                  error={Boolean(touched.nickname && errors.nickname)}
                />
                {touched.nickname && errors.nickname && (
                  <FormHelperText error id="helper-text-nickname-signup">
                    {errors.nickname}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="inviter-signup">邀请人</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.company && errors.company)}
                    id="company-signup"
                    value={values.inviter}
                    name="inviter"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                    startAdornment={
                      <>
                        <Typography variant="subtitle1">
                          <span role="img" aria-label="heart">
                            🥳
                          </span>
                        </Typography>
                        <Typography variant="subtitle1" sx={{ ml: 1 }}>
                          #
                        </Typography>
                      </>
                    }
                  />
                  {touched.inviter && errors.inviter && (
                    <FormHelperText error id="helper-text-inviter-signup">
                      {errors.inviter}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="phone-number-signup">电话</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    id="phone-number-signup"
                    type="tel"
                    value={values.phoneNumber}
                    name="phoneNumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                    sx={{ flexGrow: 1, ml: 1 }}
                    startAdornment={
                      <>
                        <Typography variant="subtitle1">
                          <span role="img" aria-label="heart">
                            😶‍🌫️
                          </span>
                        </Typography>
                        <Typography variant="subtitle1" sx={{ ml: 1 }}>
                          +86
                        </Typography>
                      </>
                    }
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <FormHelperText error id="helper-text-phone-number-signup">
                      {errors.phoneNumber}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="verification-code-signup">
                    验证码
                  </InputLabel>
                  <Stack direction="row" alignItems="center">
                    <OutlinedInput
                      error={Boolean(
                        touched.verificationCode && errors.verificationCode
                      )}
                      id="verification-code-signup"
                      type="text"
                      value={values.verificationCode}
                      name="verificationCode"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder=""
                      inputProps={{}}
                      sx={{ flexGrow: 1 }}
                    />
<Button
  variant="contained"
  color="primary"
  disabled={verificationButtonDisabled || timeLeft > 0}
  onClick={() => sendVerificationCode(values.phoneNumber)}
  sx={{ ml: 2, minWidth: "150px" }}
>
  <Box
    component="span"
    sx={{
      display: "inline-block",
      textAlign: "center",
      width: "100%",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }}
  >
    发送验证码{timeLeft > 0 ? ` (${timeLeft}秒)` : ""}
  </Box>
</Button>


                  </Stack>
                  {touched.verificationCode && errors.verificationCode && (
                    <FormHelperText
                      error
                      id="helper-text-verification-code-signup"
                    >
                      {errors.verificationCode}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">密码</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? (
                            <EyeOutlined />
                          ) : (
                            <EyeInvisibleOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box
                        sx={{
                          bgcolor: level?.color,
                          width: 85,
                          height: 8,
                          borderRadius: "7px"
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  当你注册账户时，你需要遵守 &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    当地法律法规
                  </Link>
                  &nbsp; 以及 &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    网站基本准则
                  </Link>
                  <br />
                  同时，本项目是开源的，您的数据存储过程将会保密，我们完全不会泄露或利用。
                </Typography>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    创建账号
                  </Button>
                </AnimateButton>
              </Grid>
              {/*
              <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption">第三方账号注册</Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <FirebaseSocial />
              </Grid>
              */}
            </Grid>
          </form>
        )}
      </Formik>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <CustomAlert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </CustomAlert>
      </Snackbar>
    </>
  );
};

export default AuthRegister;
