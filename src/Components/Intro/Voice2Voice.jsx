import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../Context/AppContext';
import RenderV2V from '../Services/RenderV2V';
import "../Styles/home.css";

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
                <p className='custom-title'>Text-to-Speech Synthesis
                </p>
                <p style={{ marginBottom: '15px' }} className='custom-description'>
                    Finally the System deploys text-to-speech technology to generate spoken words in the target language English from the input of English text.Text-to-Speech Synthesis(TTS) technology converts written text into spoken words. It uses voice synthesis to produce artificial speech. TTS is widely used in applications like virtual assistants which are accessibility tools for the visually impaired, language learning, enhancing user interaction and accessibility.
                </p>
                <Button variant="contained" onClick={handleTryNow}>GET STARTED</Button>
            </Box>
            {
                showASR && (
                    <RenderV2V />
                )
            }
        </Box>
    );
}