// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import './App.css'; // 直接使用import引入css文件
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import LoginStatus from './LoginStatus';


// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
    <ThemeProvider theme={theme}>
        <ThemeCustomization>
            <LoginStatus />
            <ScrollTop>
                <Routes />
            </ScrollTop>
        </ThemeCustomization>
    </ThemeProvider>
);

export default App;
