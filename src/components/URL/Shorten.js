import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { URLInfo } from './URL_Info';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCut } from '@fortawesome/free-solid-svg-icons';


export const ShortenURL = ({ URLTitle, setURLTitle, URLCategory, setURLCategory }) => {

    const [URL, setURL] = useState('');

    const handleURLInput = (event) => {
        setURL(event.target.value);
    }

    const handleSubmit = () => {
        console.log(URL);
        console.log(URLTitle);
        console.log(URLCategory);
    }

    return (
        <Container component="main" sx={{ backgroundColor: 'white', borderRadius: '8px', width: 0.6 }}>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <FontAwesomeIcon icon={faCut} />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Shorten URL
                </Typography>

                <URLInfo handleCategoryChange={setURLCategory} URL_category={URLCategory}
                    URL={URL} setURL={handleURLInput} URLTitle={URLTitle} setURLTitle={setURLTitle}
                    isURLDisabled={false} />

                <Button
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ mt: 3, mb: 2, display: 'block' }}
                >
                    Shorten
                </Button>


            </Box>
        </Container>
    );
}