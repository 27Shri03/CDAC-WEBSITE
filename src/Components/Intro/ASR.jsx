import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../Context/AppContext';
import RenderASR from '../Services/RenderASR';
import "../Styles/home.css";


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
                <p className="custom-title">ASR (Automatic Speech Recognition)
                </p>
                <p style={{marginBottom : '15px'}} className='custom-description'>
                    Automatic Speech Recognition (ASR) technology converts spoken language into written text.  This process is the first step in Speech-to-Speech translation, which begins with converting the spoken words in the source language Telugu into text through speech recognition system.
                    This involves identifying and transcribing the spoken words in Telugu accurately.

                </p>
                <Button variant="contained" onClick={handleTryNow}>GET STARTED</Button>
            </Box>
            {
                showASR && (
                    <RenderASR />
                )
            }
        </Box>
    );
}