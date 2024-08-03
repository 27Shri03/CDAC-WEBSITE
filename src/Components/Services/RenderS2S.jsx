import React, { useState, useEffect } from 'react';
import { Box, FormControl, Select, MenuItem, Typography, IconButton, Paper, Button } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useAppContext } from '../../Context/AppContext';
import { styled } from '@mui/system';
import processTextFiles from '../../../Utils/processTextFiles';

const ActionButton = styled(Button)({
    borderRadius: '20px',
    padding: '5px 15px',
    marginLeft: '10px',
});

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function RenderS2S() {
    const { TeluguText, EnglishText } = useAppContext();
    const [sourceLanguage, setSourceLanguage] = useState('Telugu');
    const [targetLanguage, setTargetLanguage] = useState('English');
    const [selectedAudioIndex, setSelectedAudioIndex] = useState(0);
    const [sourceTranscription, setSourceTranscription] = useState('');
    const [targetTranscription, setTargetTranscription] = useState('');
    const [hidden, setHidden] = useState(true);

    function handleSwitch() {
        const temp = sourceTranscription;
        setSourceTranscription(targetTranscription);
        setTargetTranscription(temp);
    }

    useEffect(() => {
        setHidden(true);
    }, [selectedAudioIndex])

    useEffect(() => {
        processTextFiles(TeluguText)
            .then(result => {
                console.log(result);
                setSourceTranscription(result);
            })
            .catch(error => {
                console.error('Error processing text files:', error);
            });
        processTextFiles(EnglishText)
            .then(result => {
                console.log(result);
                setTargetTranscription(result);
            })
            .catch(error => {
                console.error('Error processing text files:', error);
            });
    }, [])

    const handleSwapLanguages = () => {
        setSourceLanguage(prevSource => prevSource === 'Telugu' ? 'English' : 'Telugu');
        setTargetLanguage(prevTarget => prevTarget === 'Telugu' ? 'English' : 'Telugu');
        handleSwitch();
        setHidden(true);
    };

    const handleAudioChange = (index) => {
        setSelectedAudioIndex(index);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', p: 3, borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', background: 'linear-gradient(145deg, #f6f7f9, #ffffff)', border: '1px solid #e0e0e0', marginTop: '30px' }}>
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
                <Typography variant="h6" sx={{ mb: 2 }}>Select Text File</Typography>
                <FormControl sx={{ minWidth: 120, width: '100%' }}>
                    <StyledSelect
                        value={selectedAudioIndex}
                        MenuProps={MenuProps}

                    >
                        {(sourceLanguage === 'Telugu' ? TeluguText : EnglishText).map((audio, index) => (
                            <MenuItem key={index} value={index} onClick={() => handleAudioChange(index)}>
                                {audio.name}
                            </MenuItem>
                        ))}
                    </StyledSelect>
                </FormControl>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Box sx={{ width: '48%' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Source Text</Typography>
                    <Paper elevation={3} sx={{ p: 2, height: 200, overflowY: 'auto' }}>
                        <Typography>{sourceTranscription[selectedAudioIndex]}</Typography>
                    </Paper>
                </Box>
                <Box sx={{ width: '48%' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Target Text</Typography>
                    <Paper elevation={3} sx={{ p: 2, height: 200, overflowY: 'auto' }}>
                        <Typography hidden={hidden}>{targetTranscription[selectedAudioIndex]}</Typography>
                    </Paper>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
                <ActionButton variant="contained" color="primary" onClick={() => setHidden(false)}>
                    Translate
                </ActionButton>
            </Box>
        </Box>
    );
}