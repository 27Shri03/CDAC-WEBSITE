import { useRef } from 'react';
import './dragDrop.css'
import { Box, Typography, Button, List, ListItem, ListItemText, Grid, Paper, Stack } from '@mui/material';

export default function Drag_drop(props) {

    const handledrag = (event) => {
        event.preventDefault();
    }

    const handledrop = (event) => {
        event.preventDefault();
        props.setFiles(Array.from(event.dataTransfer.files));
    }

    const inputref = useRef();
    return (
        <>
            {!props.files ? (
                <div className="out">
                    <Typography>Drop your {props.custom} here : </Typography>
                    <div className='hold' onDragOver={handledrag} onDrop={handledrop}>
                        <p className='para' >Here , &#128522;
                            ;
                        </p>
                    </div>
                    <Typography margin={3}  >OR  </Typography>
                    <input type="file" multiple onChange={(event) => { props.setFiles(Array.from(event.target.files)) }} hidden
                        ref={inputref} />
                    <Button variant='contained' color='success' onClick={() => { inputref.current.click() }}>Select Files</Button>
                </div>
            ) :
                (
                    <Box>
                        <Typography marginTop={3} >Your {props.custom} are: </Typography>
                        <Box marginTop={2} >
                            {Array.from(props.files).map((file, idx) =>
                                <li key={idx} style={{ color: 'black', fontSize: '20px' }}>{file.name}</li>
                            )}
                        </Box>

                    </Box>
                )
            }
        </>
    );
}