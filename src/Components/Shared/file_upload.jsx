import React from 'react';
import {
    Button,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Paper
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppContext } from '../../Context/AppContext';

const FileUploadComponent = () => {
    const {
        TeluguText,
        setTeluguText,
        EnglishText,
        setEnglishText,
        TeluguAudio,
        setTeluguAudio,
        EnglishAudio,
        setEnglishAudio
    } = useAppContext();
    const handleFileUpload = (event, setFile) => {
        const files = Array.from(event.target.files);
        setFile(files);
    };

    const clearFiles = (setFile) => {
        setFile(null);
    };

    const renderFileList = (files) => {
        if (!files) return null;
        return (
            <List dense>
                {files.map((file, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={file.name} secondary={`${(file.size / 1024).toFixed(2)} KB`} />
                    </ListItem>
                ))}
            </List>
        );
    };

    const uploadSection = (title, files, setFiles) => (
        <Box mb={3}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
                <Button
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    style={{ marginRight: '10px' }}
                >
                    Upload
                    <input
                        type="file"
                        hidden
                        multiple
                        onChange={(e) => handleFileUpload(e, setFiles)}
                    />
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<ClearIcon />}
                    onClick={() => clearFiles(setFiles)}
                    disabled={!files}
                >
                    Clear
                </Button>
            </Box>
            <Paper
                style={{
                    maxHeight: 100,
                    overflow: 'auto',
                    padding: '10px',
                    backgroundColor: '#f5f5f5'
                }}
            >
                {renderFileList(files)}
            </Paper>
        </Box>
    );

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                Upload Files
            </Typography>
            {uploadSection("Telugu Text", TeluguText, setTeluguText)}
            {uploadSection("English Text", EnglishText, setEnglishText)}
            {uploadSection("Telugu Audio", TeluguAudio, setTeluguAudio)}
            {uploadSection("English Audio", EnglishAudio, setEnglishAudio)}
        </Box>
    );
};

export default FileUploadComponent;