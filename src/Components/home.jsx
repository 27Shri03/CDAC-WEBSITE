// Home.jsx
import React from 'react';
import { Typography, Button, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h2" gutterBottom>
                SPEECH-TO-SPEECH TRANSLATION SYSTEM FROM TELUGU TO ENGLISH
            </Typography>
            <Typography variant="body1" paragraph sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
                Our app utilizes cutting-edge AI technology to provide seamless speech translation services.
                Whether you need ASR, speech-to-speech, or voice-to-voice translation, our intuitive interface
                makes it easy to break down language barriers and communicate effectively across the globe.
            </Typography>
            <Grid container spacing={2} justifyContent="center" marginTop={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <Button fullWidth color='success' variant="contained" onClick={() => navigate('/asr')} sx={{ m: 1 }}>
                        ASR
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Button fullWidth color='error' variant="contained" onClick={() => navigate('/text2text')} sx={{ m: 1 }}>
                        Text to Text
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Button fullWidth color='secondary' variant="contained" onClick={() => navigate('/voice2voice')} sx={{ m: 1 }}>
                        Voice to Voice
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;