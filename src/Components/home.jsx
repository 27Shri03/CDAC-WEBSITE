// Home.jsx
import React from 'react';
import { Typography, Button, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "./Styles/home.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
            <p variant="h2" className="custom-title">
                A Model for Developing Telugu to English Speech-to-Speech Translation System in Indic Languages
            </p>
            <p className='custom-description'>
                Our System demonstrates Speech Translation Pipeline as a web application for translating audios from one language to another language by cascading three modules. The system combines highly accurate speech to text (ASR) for Telugu language, robust machine translation (MT) system for translated text into English, text to speech (TTS) module to render translated synthesized audio on the translated text similar to the original audio.Our intuitive system design makes it easy to breakdown language barriers and communicate effectively across the globe.

            </p>
            <Grid container spacing={2} justifyContent="center" marginTop={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <Button fullWidth color='success' variant="contained" onClick={() => navigate('/asr')} sx={{ m: 1 }}>
                        ASR
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Button fullWidth color='error' variant="contained" onClick={() => navigate('/text2text')} sx={{ m: 1 }}>
                        Text-to-text
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Button fullWidth color='secondary' variant="contained" onClick={() => navigate('/text2speech')} sx={{ m: 1 }}>
                        Text-to-Speech
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;