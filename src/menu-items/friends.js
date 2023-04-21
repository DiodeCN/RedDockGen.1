// material-ui icons
import { WebAssetOutlined, HelpOutline } from '@mui/icons-material';

// icons
const icons = {
    ChromeOutlined: WebAssetOutlined,
    QuestionOutlined: HelpOutline
};

// ==============================|| MENU ITEMS - FRIENDSPAGE ||============================== //

const friends = {
    id: 'support',
    title: '友链',
    type: 'group',
    children: [
        {
            id: 'me',
            title: '榆法糖',
            type: 'item',
            url: 'https://elmcose.cn/',
            icon: icons.ChromeOutlined,
            external: true,
            target: true
        },
        /*
        {
            id: 'we',
            title: 'RCIT红码工合作社',
            type: 'item',
            url: 'https://rcit.org.cn/',
            icon: icons.QuestionOutlined,
            external: true,
            target: true
        },
       */
        {
            id: 'my',
            title: '极越文库',
            type: 'item',
            url: 'https://lib.diodecn.cn/',
            icon: icons.QuestionOutlined,
            external: true,
            target: true
        }
    ]
};

export default friends;
