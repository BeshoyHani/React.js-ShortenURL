import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { URLInfo } from './URL_Info';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCut } from '@fortawesome/free-solid-svg-icons';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { ContainerStyle } from './../../styles/style';


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
        <Container component="main" sx={ContainerStyle}>
            <CssBaseline />

            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <FontAwesomeIcon icon={faCut} />
            </Avatar>

            <Typography component="h1" variant="h5">
                Shorten URL
            </Typography>

            <URLInfo handleCategoryChange={setURLCategory} URL_category={URLCategory}
                URL={URL} setURL={handleURLInput} URLTitle={URLTitle} setURLTitle={setURLTitle}
                isURLDisabled={false} />


            <Fab color="primary" aria-label="add"
                onClick={handleSubmit}
                sx={{ mt: 3, mb: 2, display: 'block' }}>
                <AddIcon />
            </Fab>
        </Container>
    );
}