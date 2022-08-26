import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import Fab from '@mui/material/Fab';
import { URLInfo } from './URL_Info';

export const URL = ({ }) => {
    return (
        <Container component="main" sx={{
            backgroundColor: 'white', borderRadius: '8px', width: 0.6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <CssBaseline />
            <Box
                component="img"
                sx={{
                    marginTop: 8,
                    height: 400,
                    width: 250,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                }}
                alt="The house from the offer."
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            />
            <URLInfo />
            <Box
            sx={{
                display:"flex",
                justifyContent:"center",
                width: 1,
                marginBottom: 3
            }}>
                <Fab color="default" aria-label="edit" sx={{margin:1}} onClick={() => { console.log('nesja') }}>
                    <EditIcon />
                </Fab>

                <Fab color="error" aria-label="delete" sx={{margin:1}}>
                    <DeleteIcon />
                </Fab>
            </Box>
        </Container>
    );
}