// material-ui
import { Button, Link, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import AnimateButton from 'components/@extended/AnimateButton';

// ==============================|| DRAWER CONTENT - NAVIGATION CARD ||============================== //

const NavCard = () => (
    <MainCard sx={{ bgcolor: 'grey.50', m: 3 }}>
        <Stack alignItems="center" spacing={2.5}>
            <Stack alignItems="center">
                <Typography variant="h3">红书码头</Typography>
            </Stack>
            <AnimateButton>
                <Button component={Link} target="_blank" href="https://elmcose.cn/" variant="contained" color="success" size="small">
                    爱来自榆法糖
                </Button>
            </AnimateButton>
        </Stack>
    </MainCard>
);

export default NavCard;
