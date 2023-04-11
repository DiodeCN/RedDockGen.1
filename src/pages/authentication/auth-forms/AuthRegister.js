import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

// material-ui
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
    const [level, setLevel] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationButtonDisabled, setVerificationButtonDisabled] = useState(false);

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

    const sendVerificationCode = async (phoneNumber) => {
        try {
            setVerificationButtonDisabled(true);
            await axios.post('/api/send_verification_code', { phoneNumber });
            setTimeout(() => setVerificationButtonDisabled(false), 60000); // Re-enable after 1 minute
        } catch (error) {
            console.error('Failed to send verification code:', error);
            setVerificationButtonDisabled(false);
        }
    };

    const registerUser = async (data) => {
        try {
            const response = await axios.post('/api/register', data);
            // Handle successful registration, e.g. redirect to a success page or log in the user
            console.log(response.data);
        } catch (error) {
            console.error('Failed to register user:', error);
        }
    };

    useEffect(() => {
        changePassword('');
    }, []);

    return (
        <>
            <Formik
                initialValues={{
                    nickname: '',
                    inviter: '',
                    phoneNumber: '',
                    verificationCode: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    nickname: Yup.string().max(255).required('请输入昵称'),
                    inviter: Yup.string().max(255),
                    phoneNumber: Yup.string().required('电话为必填项'),
                    verificationCode: Yup.string().required('验证码为必填项'),
                    password: Yup.string().max(255).required('密码为必填项')
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
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                        <Grid item xs={12}>
                                    <InputLabel htmlFor="firstname-signup">*昵称</InputLabel>
                                    <OutlinedInput
                                        id="firstname-login"
                                        type="firstname"
                                        value={values.firstname}
                                        name="firstname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="DiodeCN"
                                        fullWidth
                                        error={Boolean(touched.firstname && errors.firstname)}
                                    />
                                    {touched.firstname && errors.firstname && (
                                        <FormHelperText error id="helper-text-firstname-signup">
                                            {errors.firstname}
                                        </FormHelperText>
                                    )}
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="company-signup">邀请人</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.company && errors.company)}
                                        id="company-signup"
                                        value={values.company}
                                        name="company"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="#114514"
                                        inputProps={{}}
                                    />
                                    {touched.company && errors.company && (
                                        <FormHelperText error id="helper-text-company-signup">
                                            {errors.company}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
    <Stack spacing={1}>
        <InputLabel htmlFor="phone-number-signup">*电话号码</InputLabel>
        <OutlinedInput
            fullWidth
            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
            id="phone-number-signup"
            type="tel"
            value={values.phoneNumber}
            name="phoneNumber"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="1234567890"
            inputProps={{}}
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
        <InputLabel htmlFor="verification-code-signup">*验证码</InputLabel>
        <Stack direction="row" alignItems="center">
            <OutlinedInput
                error={Boolean(touched.verificationCode && errors.verificationCode)}
                id="verification-code-signup"
                type="text"
                value={values.verificationCode}
                name="verificationCode"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="123456"
                inputProps={{}}
                sx={{ flexGrow: 1 }}
            />
            <Button
                variant="contained"
                color="primary"
                disabled={verificationButtonDisabled}
                onClick={() => sendVerificationCode(values.phoneNumber)}
                sx={{ ml: 2 }}
            >
                发送验证码
            </Button>
        </Stack>
        {touched.verificationCode && errors.verificationCode && (
            <FormHelperText error id="helper-text-verification-code-signup">
                {errors.verificationCode}
            </FormHelperText>
        )}
    </Stack>
</Grid>


                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-signup">*密码</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="password-signup"
                                        type={showPassword ? 'text' : 'password'}
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
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="******"
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
                                            <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
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
                            <Grid item xs={12}>
                                <Divider>
                                    <Typography variant="caption">第三方账号注册</Typography>
                                </Divider>
                            </Grid>
                            <Grid item xs={12}>
                                <FirebaseSocial />
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthRegister;
