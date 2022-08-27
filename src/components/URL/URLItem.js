import { ContainerStyle } from './../../styles/style';
import Box from '@mui/material/Box';
import { URLImg } from './URLImg';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { Fab } from '@mui/material';

export const URLItem = () => {
    return (
        <Box component="main" sx={{...ContainerStyle, width: 0.97, margin: 3}}>
            <Box sx={{
                display: 'flex',
                width: 1,
                alignItems: 'center'
            }}>
                <URLImg alt={"Top Gun Movie"} imgURL={"http://res.cloudinary.com/dpecxlfg2/image/upload/v1661592245/dbgrrfxidtvj6ms4pysr.jpg"} />

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
                        value=""
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
                            value={""}
                            disabled={true}
                        />
                        <Fab color="primary" sx={{ margin: 2 }}>
                            <FontAwesomeIcon icon={faCopy} />
                        </Fab>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}