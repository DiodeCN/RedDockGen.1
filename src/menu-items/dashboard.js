// assets
import { PublishOutlined, HistoryOutlined, StorefrontOutlined, BookmarkOutlined } from '@mui/icons-material';

// icons
const icons = {
    StorefrontOutlined,
    PublishOutlined,
    HistoryOutlined,
    BookmarkOutlined // 添加了 BookmarkOutlined 图标
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'dash-main',
    title: '广场',
    type: 'group',
    children: [
        {
            id: 'main',
            title: '主页',
            type: 'item',
            url: '/',
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
            title: '记录',
            type: 'item',
            url: '/history',
            icon: icons.HistoryOutlined,
            breadcrumbs: false
        },
        {
            id: 'likes',
            title: '收藏',
            type: 'item',
            url: '/likes',
            icon: icons.BookmarkOutlined, // 使用 BookmarkOutlined 图标
            breadcrumbs: false
        },
    ]
};

export default dashboard;
