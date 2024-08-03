import React, { useState, useEffect, useRef } from 'react';
import { Box, FormControl, Select, MenuItem, Typography, IconButton, Paper , Button } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import WaveSurfer from 'wavesurfer.js';
import { useAppContext } from '../../Context/AppContext';
import { styled } from '@mui/system';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause'

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

const WaveformContainer = styled(Box)({
    width: '100%',
    height: '60px',
    marginTop: '20px',
    marginBottom: '20px',
});

export default function RenderS2S() {
    const { TeluguAudio, TeluguText, EnglishText, EnglishAudio } = useAppContext();
    const [sourceLanguage, setSourceLanguage] = useState('Telugu');
    const [targetLanguage, setTargetLanguage] = useState('English');
    const [selectedAudioIndex, setSelectedAudioIndex] = useState(0);
    const [sourceTranscription, setSourceTranscription] = useState('');
    const [targetTranscription, setTargetTranscription] = useState('');
    const [isSourcePlaying, setIsSourcePlaying] = useState(false);
    const [isTargetPlaying, setIsTargetPlaying] = useState(false);
    const sourceWaveformRef = useRef(null);
    const targetWaveformRef = useRef(null);
    const sourceWavesurferRef = useRef(null);
    const targetWavesurferRef = useRef(null);

    const handleSourcePlayPause = () => {
        if (sourceWavesurferRef.current) {
            if (isSourcePlaying) {
                sourceWavesurferRef.current.pause();
            } else {
                sourceWavesurferRef.current.play();
            }
            setIsSourcePlaying(!isSourcePlaying);
        }
    };

    const handleTargetPlayPause = () => {
        if (targetWavesurferRef.current) {
            if (isTargetPlaying) {
                targetWavesurferRef.current.pause();
            } else {
                targetWavesurferRef.current.play();
            }
            setIsTargetPlaying(!isTargetPlaying);
        }
    };

    useEffect(() => {
        const sourceTextFile = sourceLanguage === 'Telugu' ? TeluguText[0] : EnglishText[0];
        const targetTextFile = sourceLanguage === 'Telugu' ? EnglishText[0] : TeluguText[0];

        const readFile = (file, setTranscription) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target.result;
                const lines = text.split('\n').filter(line => line.trim() !== '');
                setTranscription(lines);
            };
            reader.onerror = (error) => {
                console.error('Error reading text file:', error);
            };
            reader.readAsText(file);
        };

        readFile(sourceTextFile, setSourceTranscription);
        readFile(targetTextFile, setTargetTranscription);

        // Initialize WaveSurfer for source and target audio
        const initWaveSurfer = (audioFile, waveformRef, wavesurferRef) => {
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

            wavesurferRef.current.load(URL.createObjectURL(audioFile));
        };

        if (sourceWavesurferRef.current) {
            sourceWavesurferRef.current.on('play', () => setIsSourcePlaying(true));
            sourceWavesurferRef.current.on('pause', () => setIsSourcePlaying(false));
        }
        if (targetWavesurferRef.current) {
            targetWavesurferRef.current.on('play', () => setIsTargetPlaying(true));
            targetWavesurferRef.current.on('pause', () => setIsTargetPlaying(false));
        }

        const sourceAudioFile = sourceLanguage === 'Telugu' ? TeluguAudio[selectedAudioIndex] : EnglishAudio[selectedAudioIndex];
        const targetAudioFile = sourceLanguage === 'Telugu' ? EnglishAudio[selectedAudioIndex] : TeluguAudio[selectedAudioIndex];

        initWaveSurfer(sourceAudioFile, sourceWaveformRef, sourceWavesurferRef);
        initWaveSurfer(targetAudioFile, targetWaveformRef, targetWavesurferRef);

        return () => {
            if (sourceWavesurferRef.current) sourceWavesurferRef.current.destroy();
            if (targetWavesurferRef.current) targetWavesurferRef.current.destroy();
        };
    }, [selectedAudioIndex, sourceLanguage, TeluguAudio, TeluguText, EnglishText, EnglishAudio]);

    const handleSwapLanguages = () => {
        setSourceLanguage(prevSource => prevSource === 'Telugu' ? 'English' : 'Telugu');
        setTargetLanguage(prevTarget => prevTarget === 'Telugu' ? 'English' : 'Telugu');
        setSelectedAudioIndex(0);
    };

    const handleAudioChange = (event) => {
        setSelectedAudioIndex(event.target.value);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', p: 3, borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', background: 'linear-gradient(145deg, #f6f7f9, #ffffff)', border: '1px solid #e0e0e0' , marginTop : '50px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>Source Language</Typography>
                    <Typography variant="h5">{sourceLanguage}</Typography>
                </Box>
                <IconButton onClick={handleSwapLanguages}>
                    <SwapHorizIcon />
                </IconButton>
                <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>Target Language</Typography>
                    <Typography variant="h5">{targetLanguage}</Typography>
                </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Select Audio File</Typography>
                <FormControl sx={{ minWidth: 120, width: '100%' }}>
                    <StyledSelect
                        value={selectedAudioIndex}
                        onChange={handleAudioChange}
                    >
                        {(sourceLanguage === 'Telugu' ? TeluguAudio : EnglishAudio).map((audio, index) => (
                            <MenuItem key={index} value={index}>
                                {audio.name}
                            </MenuItem>
                        ))}
                    </StyledSelect>
                </FormControl>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Box sx={{ width: '48%' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Source Transcription</Typography>
                    <Paper elevation={3} sx={{ p: 2, height: 200, overflowY: 'auto' }}>
                        <Typography>{sourceTranscription[selectedAudioIndex]}</Typography>
                    </Paper>
                    <WaveformContainer ref={sourceWaveformRef} />
                    <Button
                        variant="contained"
                        startIcon={isSourcePlaying ? <PauseIcon /> : <PlayArrowIcon />}
                        onClick={handleSourcePlayPause}
                        sx={{ mt: 1 }}
                    >
                        {isSourcePlaying ? 'Pause' : 'Play'}
                    </Button>
                </Box>
                <Box sx={{ width: '48%' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Target Transcription</Typography>
                    <Paper elevation={3} sx={{ p: 2, height: 200, overflowY: 'auto' }}>
                        <Typography>{targetTranscription[selectedAudioIndex]}</Typography>
                    </Paper>
                    <WaveformContainer ref={targetWaveformRef} />
                    <Button
                        variant="contained"
                        startIcon={isTargetPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                        onClick={handleTargetPlayPause}
                        sx={{ mt: 1 }}
                    >
                        {isTargetPlaying ? 'Pause' : 'Play'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}