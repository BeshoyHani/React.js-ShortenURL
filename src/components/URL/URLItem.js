import { ContainerStyle } from './../../styles/style';
import Box from '@mui/material/Box';
import { URLImg } from './URLImg';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { Fab } from '@mui/material';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export const URLItem = ({ imageURL, title, shortURL }) => {
    const [isCopied, setCopyStatus] = useState(false);
    const copyURL = (event) => {
        event.preventDefault();
        navigator.clipboard.writeText(URL);
        setCopyStatus(true);
        console.log('b')
    }
    return (
        <Box component="main" sx={{ ...ContainerStyle, width: 0.97, marginTop: 2 }}>
            <Box sx={{
                display: 'flex',
                width: 1,
                alignItems: 'center'
            }}>
                <URLImg alt={"Top Gun Movie"} imgURL={imageURL} />

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 0.8,
                    margin: 3
                }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        name="title"
                        label="Title"
                        type="text"
                        id="title"
                        autoComplete="current-password"
                        value={title}
                    />
                    <Box sx={{ display: 'flex', width: 1, justifyContent: 'space-between' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="oURL"
                            label="URL"
                            name="URL"
                            autoComplete="UEL"
                            autoFocus
                            value={shortURL}
                        />
                        <Fab color="primary" sx={{ margin: 2 }} onClick={copyURL}>
                            <FontAwesomeIcon icon={faCopy} />
                        </Fab>
                    </Box>
                </Box>
            </Box>

            <Snackbar open={isCopied} autoHideDuration={4000} onClose={() => { setCopyStatus(false) }}>
                <Alert onClose={() => { setCopyStatus(false) }} severity="success" sx={{ width: '100%' }}>
                    Copied!
                </Alert>
            </Snackbar>
        </Box>
    );
}