// assets
import { ChatOutlined, AnnouncementOutlined } from '@mui/icons-material';

// icons
const icons = {
    ChatOutlined,
    AnnouncementOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
    id: 'community',
    title: '社区',
    type: 'group',
    children: [
        {
            id: 'chat',
            title: '聊天',
            type: 'item',
            url: '/chat',
            icon: icons.ChatOutlined,
            target: true
        },
        {
            id: 'announcement',
            title: '公告',
            type: 'item',
            url: '/announcement',
            icon: icons.AnnouncementOutlined,
            target: true
        }
    ]
};

export default pages;
