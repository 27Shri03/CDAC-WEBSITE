import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import '../Shared/dragDrop.css';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../Context/AppContext';
import RenderS2S from '../Services/RenderS2S';


export default function Speech2Speech() {
    const { TeluguAudio, TeluguText, EnglishText, EnglishAudio } = useAppContext();
    const [showASR, setShowASR] = useState(false);
    const navigate = useNavigate();
    const handleTryNow = () => {
        if (TeluguAudio && TeluguText && EnglishAudio && EnglishText) {
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
                <Typography variant="h3" gutterBottom>Text to Text</Typography>
                <Typography variant="body1" paragraph sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
                    Text-to-Text (T2T) refers to a type of natural language processing (NLP) technology where input text is transformed into a different text output. Applications include machine translation, text summarization, paraphrasing, and sentiment analysis. T2T systems leverage advanced algorithms and neural networks to understand, interpret, and generate human-like text, enhancing communication and information accessibility.
                </Typography>
                <Button variant="contained" onClick={handleTryNow}>Try Now!</Button>
            </Box>
            {
                showASR && (
                    <RenderS2S />
                )
            }
        </Box>
    );
}