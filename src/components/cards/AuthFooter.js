// material-ui
import { useMediaQuery, Container, Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter = () => {
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Container maxWidth="xl">
            <Stack
                direction={matchDownSM ? 'column' : 'row'}
                justifyContent={matchDownSM ? 'center' : 'space-between'}
                spacing={2}
                textAlign={matchDownSM ? 'center' : 'inherit'}
            >
                <Typography variant="subtitle2" color="secondary" component="span">
                    &copy; 编程自&nbsp;
                    <Typography component={Link} variant="subtitle2" href="https://elmcose.cn" target="_blank" underline="hover">
                        ElmCose
                    </Typography>
                </Typography>

                <Stack
                    direction={matchDownSM ? 'column' : 'row'}
                    spacing={matchDownSM ? 1 : 3}
                    textAlign={matchDownSM ? 'center' : 'inherit'}
                >
                    <Typography
                        variant="subtitle2"
                        color="secondary"
                        component={Link}
                        href="https://elmcose.cn/"
                        target="_blank"
                        underline="hover"
                    >
                       榆法糖
                    </Typography>
                    {/*
                    <Typography
                        variant="subtitle2"
                        color="secondary"
                        component={Link}
                        href="https://rcit.org.cn/"
                        target="_blank"
                        underline="hover"
                    >
                        RCIT红码工合作社
                    </Typography>
                    */}
                    <Typography
                        variant="subtitle2"
                        color="secondary"
                        component={Link}
                        href="https://lib.diodecn.cn/"
                        target="_blank"
                        underline="hover"
                    >
                        极越文库
                    </Typography>
                </Stack>
            </Stack>
        </Container>
    );
};

export default AuthFooter;
