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
import CircularProgress from '@mui/material/CircularProgress';
import { Alert } from '@mui/material';
import { shorten_url } from '../../config/shorten_URL_API';
import { useNavigate } from 'react-router-dom';


export const ShortenURL = ({ URLTitle, setURLTitle, URLCategory, setURLCategory }) => {

    const [URL, setURL] = useState('');
    const [emptyURLError, setEmptyURLError] = useState(false);
    const [submitBtnStatus, setSubmitBtnStatus] = useState(false);
    const navigate = useNavigate();

    // if (true) {
    //     return <Navigate to="/login" replace />;
    //   }

    const handleURLInput = (event) => {
        setURL(event.target.value);
    }

    // useEffect(() => {
    //     // window.history.pushState(null, document.title, window.location.href);
    // })

    const handleSubmit = async () => {
        if (!URL.trim()) {
            setEmptyURLError(true);
            return;
        }
        try {
            setSubmitBtnStatus(true);
            const res = await shorten_url(URL.trim(), URLTitle.trim(), URLCategory);
            navigate(`/my/urls/${res._id}`)
        } catch (error) {
            console.log(error.message);
            setSubmitBtnStatus(false);
        }
    }

    return (
        <Container component="main" sx={{ ...ContainerStyle, width: 0.95 }}>
            <CssBaseline />

            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <FontAwesomeIcon icon={faCut} />
            </Avatar>

            <Typography component="h1" variant="h5">
                Shorten URL
            </Typography>

            <URLInfo setURLCategory={setURLCategory} URL_category={URLCategory}
                URL={URL} setURL={handleURLInput} URLTitle={URLTitle} setURLTitle={setURLTitle}
                isURLDisabled={false} />

            {
                emptyURLError &&
                <Alert severity="error" sx={{}}>{'URL can\'t be empty'}</Alert>
            }
            {
                submitBtnStatus &&
                <CircularProgress disableShrink size={80} sx={{ position: 'relative', bottom: '160px', marginBottom: -15 }} />
            }

            <Fab color="primary" aria-label="add"
                onClick={handleSubmit}
                disabled={submitBtnStatus}
                sx={{ mt: 3, mb: 2, display: 'block' }}>
                <AddIcon />
            </Fab>
        </Container>
    );
}