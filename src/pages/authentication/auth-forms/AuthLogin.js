import React ,{ useState }from "react";
import { Link as RouterLink } from "react-router-dom";
import CryptoJS from 'crypto-js';

// material-ui
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project import
import FirebaseSocial from "./FirebaseSocial";
import AnimateButton from "components/@extended/AnimateButton";

// assets
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {


  const [checked, setChecked] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  



  return (
    <>
      <Formik
        placeholder="demo@elmcose.com"
        initialValues={{
          email: "",
          password: "",
          submit: null
        }}
        validationSchema={Yup.object().shape({
            email: Yup.string()
              .required("电话号码是必填项。"),
            password: Yup.string().max(255).required("密码是必填项。")
          })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
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
        }) => {
          const handleClick = async (email, password) => {
            const secretKey = process.env.REACT_APP_SECRET_KEY;
            const timestamp = new Date().toISOString();
            const dataToEncrypt = timestamp+"|"+"86"+email+"|"+password;

            
            const key = CryptoJS.enc.Utf8.parse(secretKey);
            const iv = CryptoJS.lib.WordArray.random(16);
            
            const encrypted = CryptoJS.AES.encrypt(dataToEncrypt, key, {
              iv: iv,
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.Pkcs7
            });
            
            const encryptedData = iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
            
            console.log(encryptedData);
            /*
            console.log(
              JSON.stringify({
              timestamp,
              email,
              password,
              encrypted: encryptedData, // Change this line
            })
            );
            */
            const response = await fetch("https://api.cloudepot.cn/api/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                timestamp,
                email,
                password,
                encrypted: encryptedData, // Change this line
              }),
            });
        

            const result = await response.json();
            console.log(result);
          };
          return (

          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">电话</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder=""
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
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
                  {touched.email && errors.email && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login"
                    >
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">密码</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
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
                    placeholder=""
                  />
                  {touched.password && errors.password && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-password-login"
                    >
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">保持登录状态</Typography>}
                  />
                  <Link
                    variant="h6"
                    component={RouterLink}
                    to=""
                    color="text.primary"
                  >
                    忘记密码？
                  </Link>
                </Stack>
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
                    onClick={() => handleClick(values.email, values.password)}
                    >
                    登录
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
          );
        }}
      </Formik>
    </>
  );
};

export default AuthLogin;
