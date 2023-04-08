import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Edit, Person, AccountBalanceWallet, ExitToApp, HelpOutline } from '@mui/icons-material';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout }) => {
    const theme = useTheme();

    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
            <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                <ListItemIcon sx={{ color: '#4A90E2' }}>
                    <Edit />
                </ListItemIcon>
                <ListItemText primary="资料" />
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
                <ListItemIcon sx={{ color: '#4A90E2' }}>
                    <Person />
                </ListItemIcon>
                <ListItemText primary="关注" />
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
                <ListItemIcon sx={{ color: '#4A90E2' }}>
                    <AccountBalanceWallet />
                </ListItemIcon>
                <ListItemText primary="钱包" />
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
                <ListItemIcon sx={{ color: '#4A90E2' }}>
                    <HelpOutline />
                </ListItemIcon>
                <ListItemText primary="帮助" />
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
                <ListItemIcon sx={{ color: '#4A90E2' }}>
                    <ExitToApp />
                </ListItemIcon>
                <ListItemText primary="登出" />
            </ListItemButton>
        </List>
    );
};

ProfileTab.propTypes = {
    handleLogout: PropTypes.func
};

export default ProfileTab;
