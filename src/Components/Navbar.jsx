// Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Button , Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
            <Stack height={50} spacing={2} direction="row" padding={1}>
                <Button
                    color="inherit"
                    component={Link}
                    to="/"
                    sx={{
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)', // light white background on hover
                        }
                    }}
                >
                    HOME
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to="/asr"
                    sx={{
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)', // light white background on hover
                        }
                    }}
                >
                    ASR
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to="/text2text"
                    sx={{
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)', // light white background on hover
                        }
                    }}
                >
                    Text to Text
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to="/voice2voice"
                    sx={{
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)', // light white background on hover
                        }
                    }}
                >
                    Voice2Voice
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to="/uploadFiles"
                    sx={{
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)', // light white background on hover
                        }
                    }}
                >
                    uploadFiles
                </Button>
            </Stack>
        </AppBar>
    );
};

export default Navbar;
