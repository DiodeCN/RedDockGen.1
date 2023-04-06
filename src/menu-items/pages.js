// assets
import { LockOutlined, PersonAddOutlined } from '@mui/icons-material';

// icons
const icons = {
    LoginOutlined: LockOutlined,
    ProfileOutlined: PersonAddOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
    id: 'authentication',
    title: '用户',
    type: 'group',
    children: [
        {
            id: 'login1',
            title: '登录',
            type: 'item',
            url: '/login',
            icon: icons.LoginOutlined,
            target: true
        },
        {
            id: 'register1',
            title: '注册',
            type: 'item',
            url: '/register',
            icon: icons.ProfileOutlined,
            target: true
        }
    ]
};

export default pages;
