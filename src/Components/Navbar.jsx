// Navbar.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Stack, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const navItems = [
        { text: 'HOME', path: '/' },
        { text: 'ASR', path: '/asr' },
        { text: 'Text-to-text', path: '/text2text' },
        { text: 'Text-to-speech', path: '/text2speech' },
        { text: 'Upload Files', path: '/uploadFiles' },
    ];

    const renderNavItems = () => (
        navItems.map((item) => (
            <Button
                key={item.text}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    }
                }}
            >
                {item.text}
            </Button>
        ))
    );

    const renderMobileDrawer = () => (
        <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
        >
            <List>
                {navItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        component={Link}
                        to={item.path}
                        onClick={() => setDrawerOpen(false)}
                    >
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );

    return (
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
            <Toolbar>
                {isMobile ? (
                    <>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={() => setDrawerOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        {renderMobileDrawer()}
                    </>
                ) : (
                    <Stack direction="row" spacing={2}>
                        {renderNavItems()}
                    </Stack>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;