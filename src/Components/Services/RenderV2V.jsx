import React, { useState, useEffect, useRef } from 'react';
import { Box, FormControl, Select, MenuItem, Typography, Button, Paper } from '@mui/material';
import { styled } from '@mui/system';
import WaveSurfer from 'wavesurfer.js';
import { useAppContext } from '../../Context/AppContext';
import processTextFiles from '../../../Utils/processTextFiles';

const StyledSelect = styled(Select)(({ theme }) => ({
    backgroundColor: 'white',
    borderRadius: '20px',
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
    },
}));

const ActionButton = styled(Button)({
    borderRadius: '20px',
    padding: '5px 15px',
    marginLeft: '10px',
});

const WaveformContainer = styled(Box)({
    width: '100%',
    height: '60px',
    marginTop: '20px',
    marginBottom: '20px',
});

const RenderV2V = () => {
    const { EnglishAudio, EnglishText } = useAppContext();
    const [selectedAudioIndex, setSelectedAudioIndex] = useState(0);
    const [transcription, setTranscription] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [hidden, setHidden] = useState(true);
    const waveformRef = useRef(null);
    const wavesurferRef = useRef(null);

    useEffect(() => {
        processTextFiles(EnglishText[0])
            .then(result => {
                console.log(result);
                setTranscription(result);
            })
            .catch(error => {
                console.error('Error processing text files:', error);
            });
    }, [])

    useEffect(() => {
        // Initialize WaveSurfer
        setIsPlaying(false);
        setHidden(true);
        if (EnglishAudio && EnglishAudio[selectedAudioIndex]) {
            if (wavesurferRef.current) {
                wavesurferRef.current.destroy();
            }

            wavesurferRef.current = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: '#4F4A85',
                progressColor: '#383351',
                cursorColor: '#383351',
                barWidth: 2,
                barRadius: 3,
                responsive: true,
                height: 60,
                normalize: true,
                partialRender: true,
            });

            wavesurferRef.current.load(URL.createObjectURL(EnglishAudio[selectedAudioIndex]));

            wavesurferRef.current.on('ready', () => {
                // Waveform is ready to play
            });

            wavesurferRef.current.on('finish', () => {
                setIsPlaying(false);
            });

            return () => {
                if (wavesurferRef.current) {
                    wavesurferRef.current.destroy();
                }
            };
        }
    }, [selectedAudioIndex, EnglishAudio]);

    const handleAudioChange = (index) => {
        setSelectedAudioIndex(index);
    };

    const togglePlayPause = () => {
        if (wavesurferRef.current) {
            wavesurferRef.current.playPause();
            setIsPlaying(!isPlaying);
        }
    };

    const handleDownload = () => {
        if (EnglishAudio && EnglishAudio[selectedAudioIndex]) {
            const url = URL.createObjectURL(EnglishAudio[selectedAudioIndex]);
            const a = document.createElement('a');
            a.href = url;
            a.download = EnglishAudio[selectedAudioIndex].name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    return (
        <Box sx={{
            width: '100%',
            maxWidth: 800,
            mx: 'auto',
            p: 3,
            height: '550px',
            marginTop: '20px',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            background: 'linear-gradient(145deg, #f6f7f9, #ffffff)',
            border: '1px solid #e0e0e0'
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Select Source Language
                    </Typography>
                    <FormControl sx={{ minWidth: 120, width: '100%' }}>
                        <StyledSelect value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
                            <MenuItem value="English">English</MenuItem>
                        </StyledSelect>
                    </FormControl>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Select Text File
                    </Typography>
                    <FormControl sx={{ minWidth: 120, width: '100%' }}>
                        <StyledSelect
                            value={selectedAudioIndex}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 300,
                                    },
                                },
                            }}
                        >
                            {transcription.map((audio, index) => (
                                <MenuItem key={index} value={index} onClick={() => handleAudioChange(index)}>
                                    {index}.txt
                                </MenuItem>
                            ))}
                        </StyledSelect>
                    </FormControl>
                </Box>
            </Box>

            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    borderRadius: 4,
                    mb: 4,
                    height: '150px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    margin: '30px',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#888',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#555',
                    },
                }}
            >
                <Typography variant="body1">
                    {transcription[selectedAudioIndex]}
                </Typography>
            </Paper>

            <WaveformContainer hidden={hidden} style={{ marginTop: '60px' }} ref={waveformRef} />

            <Box sx={{ display: 'flex', justifyContent: hidden ? 'center' : 'space-between', alignItems: 'center', marginTop: '50px' }}>
                {!hidden && <ActionButton variant="contained" color="primary" onClick={togglePlayPause}>
                    {isPlaying ? 'Pause' : 'Play'}
                </ActionButton>}
                <ActionButton variant="contained" color="primary" onClick={() => setHidden(false)}>
                    Synthesise Speech
                </ActionButton>
                <Box>
                    {!hidden && <ActionButton variant="contained" color="primary" onClick={handleDownload}>
                        Download
                    </ActionButton>}
                </Box>
            </Box>
        </Box>
    );
};

export default RenderV2V;