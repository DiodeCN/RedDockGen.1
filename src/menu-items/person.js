import { AccountCircleOutlined, CreditCardOutlined } from '@mui/icons-material';

const icons = {
    AccountCircleOutlined,
    CreditCardOutlined
};

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
            icon: icons.AccountCircleOutlined,
            breadcrumbs: false
        },
        {
            id: 'wallet',
            title: '钱包',
            type: 'item',
            url: '/wallet',
            icon: icons.CreditCardOutlined,
            breadcrumbs: false
        }
    ]
};

export default person;
