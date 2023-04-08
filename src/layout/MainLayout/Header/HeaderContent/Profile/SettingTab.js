import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { HelpOutline, LockOutlined, UserOutlined, UnorderedListOutlined, Favorite } from '@mui/icons-material';

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

const SettingTab = () => {
    const theme = useTheme();

    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
            <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                <ListItemIcon sx={{ color: '#4A90E2' }}>
                    <HelpOutline />
                </ListItemIcon>
                <ListItemText primary="暂时未想好..." />
            </ListItemButton>
            {/*
            <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
                <ListItemIcon sx={{ color: '#FFFF00' }}>
                    <Favorite />
                </ListItemIcon>
                <ListItemText primary="We stand with ukraine" />
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
                <ListItemIcon sx={{ color: '#FF69B4' }}>
                    <Favorite />
                </ListItemIcon>
                <ListItemText primary="We stand with LGBT" />
            </ListItemButton>
            */}
        </List>
    );
};

export default SettingTab;
