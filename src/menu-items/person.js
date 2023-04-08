// material-ui icons
import { StorefrontOutlined, PublishOutlined, HistoryOutlined, BookOutlined } from '@mui/icons-material';

// icons
const icons = {
    StorefrontOutlined,
    PublishOutlined,
    HistoryOutlined,
    BookOutlined
};

// ==============================|| MENU ITEMS - person ||============================== //

const person = {
    id: 'person',
    title: '个人',
    type: 'group',
    children: [
        {
            id: 'data',
            title: '资料',
            type: 'item',
            url: '/data',
            icon: icons.BookOutlined,
            breadcrumbs: false
        },
        {
            id: 'data',
            title: '资料',
            type: 'item',
            url: '/data',
            icon: icons.BookOutlined,
            breadcrumbs: false
        }
    ]
};

export default person;
