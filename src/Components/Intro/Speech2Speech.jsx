import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../Context/AppContext';
import RenderS2S from '../Services/RenderS2S';
import "../Styles/home.css";


export default function Speech2Speech() {
    const { TeluguText, EnglishText } = useAppContext();
    const [showASR, setShowASR] = useState(false);
    const navigate = useNavigate();
    const handleTryNow = () => {
        if (TeluguText && EnglishText) {
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
                <p variant="h3" className='custom-title'>Text-to-Text Machine Translation
                </p>
                <p style={{marginBottom : '15px'}} className='custom-description'>
                    Text-to-Text (T2T) refers to a type of natural language processing (NLP) technology where input text is transformed into a different text output. Applications include machine translation, text summarization, paraphrasing, and sentiment analysis. Text-to-Text translation in this system employs machine translation techniques to convert the text from the source language Telugu to the target language English.
                </p>
                <Button variant="contained" onClick={handleTryNow}>Get Started</Button>
            </Box>
            {
                showASR && (
                    <RenderS2S />
                )
            }
        </Box>
    );
}