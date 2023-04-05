// assets
import { PublishOutlined, HistoryOutlined, StorefrontOutlined } from '@mui/icons-material';

// icons
const icons = {
    StorefrontOutlined,
    PublishOutlined,
    HistoryOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'dash-main',
    title: '交易中心',
    type: 'group',
    children: [
        {
            id: 'main',
            title: '主页',
            type: 'item',
            url: '/main',
            icon: icons.StorefrontOutlined,
            breadcrumbs: false
        },
        {
            id: 'release',
            title: '发布',
            type: 'item',
            url: '/release',
            icon: icons.PublishOutlined,
            breadcrumbs: false
        },
        {
            id: 'history',
            title: '历史交易',
            type: 'item',
            url: '/history',
            icon: icons.HistoryOutlined,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
