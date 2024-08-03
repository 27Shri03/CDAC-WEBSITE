import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../Context/AppContext';
import RenderASR from '../Services/RenderASR';


export default function ASR() {
    const { TeluguAudio, TeluguText } = useAppContext();
    const [showASR, setShowASR] = useState(false);
    const navigate = useNavigate();
    const handleTryNow = () => {
        if (TeluguAudio && TeluguText) {
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
                <Typography variant="h3" gutterBottom>ASR</Typography>
                <Typography variant="body1" paragraph sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
                    Automatic Speech Recognition (ASR) technology converts spoken language into written text.
                    Our advanced ASR system utilizes deep learning algorithms to accurately transcribe audio
                    in real-time, supporting multiple languages and accents.
                </Typography>
                <Button variant="contained" onClick={handleTryNow}>Try Now!</Button>
            </Box>
            {
                showASR && (
                    <RenderASR />
                )
            }
        </Box>
    );
}