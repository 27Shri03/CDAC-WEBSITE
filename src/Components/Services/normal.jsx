import React, { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Grid, Typography, Paper, Container } from '@mui/material';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const RenderASR = ({ TeluguAudio, EnglishAudio, TeluguText, EnglishText }) => {
    const [sourceLanguage, setSourceLanguage] = useState('English');
    const [selectedAudioIndex, setSelectedAudioIndex] = useState(0);
    const [currentAudioList, setCurrentAudioList] = useState([]);
    const [transcriptionLines, setTranscriptionLines] = useState([]);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    useEffect(() => {
        const audioList = sourceLanguage === 'Telugu' ? TeluguAudio : EnglishAudio;
        setCurrentAudioList(audioList);
        setSelectedAudioIndex(0);

        const textFile = sourceLanguage === 'Telugu' ? TeluguText[0] : EnglishText[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target.result;
            const lines = text.split('\n').filter(line => line.trim() !== '');
            setTranscriptionLines(lines);
        };
        reader.onerror = (error) => {
            console.error('Error reading text file:', error);
        };
        reader.readAsText(textFile);
    }, [sourceLanguage, TeluguAudio, EnglishAudio, TeluguText, EnglishText]);

    const handleLanguageChange = (event) => {
        setSourceLanguage(event.target.value);
    };

    const handleAudioChange = (event) => {
        setSelectedAudioIndex(event.target.value);
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Source Language</InputLabel>
                            <Select value={sourceLanguage} onChange={handleLanguageChange} label="Source Language">
                                <MenuItem value="Telugu">Telugu</MenuItem>
                                <MenuItem value="English">English</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Audio File</InputLabel>
                            <Select
                                value={selectedAudioIndex}
                                onChange={handleAudioChange}
                                label="Audio File"
                                MenuProps={MenuProps}
                            >
                                {currentAudioList.map((audio, index) => (
                                    <MenuItem key={index} value={index}>
                                        {audio.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={3} sx={{ mt: 2 }}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                            <Typography variant="h6" gutterBottom>
                                Audio Player
                            </Typography>
                            {currentAudioList[selectedAudioIndex] && (
                                <AudioPlayer
                                    src={URL.createObjectURL(currentAudioList[selectedAudioIndex])}
                                    customAdditionalControls={[]}
                                    style={{ boxShadow: 'none' }}
                                />
                            )}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6" gutterBottom>
                                Transcription
                            </Typography>
                            <Typography sx={{ flexGrow: 1, overflowY: 'auto' }}>
                                {transcriptionLines[selectedAudioIndex] || 'No transcription available'}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default RenderASR;