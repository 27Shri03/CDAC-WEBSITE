import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../Context/AppContext';
import RenderV2V from '../Services/RenderV2V';

export default function Voice2Voice() {
    const { EnglishAudio, EnglishText } = useAppContext();
    const [showASR, setShowASR] = useState(false);
    const navigate = useNavigate();
    const handleTryNow = () => {
        if (EnglishAudio && EnglishText) {
            setShowASR(true);
        }
        else {
            alert("Please Upload the files to proceed");
            navigate('/uploadFiles');
        }
    }

    return (
        <Box sx={{ height: '100vh', p: 3, textAlign: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom>Text to Speech</Typography>
                <Typography variant="body1" paragraph sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
                    Text-to-speech (TTS) technology converts written text into spoken words. It uses natural language processing and voice synthesis to produce lifelike speech. TTS is widely used in applications like virtual assistants, accessibility tools for the visually impaired, and language learning, enhancing user interaction and accessibility.
                </Typography>
                <Button variant="contained" onClick={handleTryNow}>Try Now!</Button>
            </Box>
            {
                showASR && (
                    <RenderV2V />
                )
            }
        </Box>
    );
}