import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import { URLInfo } from './URL_Info';
import { ContainerStyle } from './../../styles/style';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { URLImg } from './URLImg';
import { delete_url, import_url } from '../../config/shorten_URL_API';
import { update_url_info, get_url_info } from './../../config/shorten_URL_API';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';

export const URL = ({ isAuth, currentUserID }) => {
    const jsonObj = {
        "_id": "",
        "title": "",
        "category": "",
        "clicks": "",
        "img": "",
        "shortURL": '',
        'userID': ''
    }
    const location = useLocation();
    const [URLCategory, setURLCategory] = useState('');
    const [URLTitle, setURLTitle] = useState('');
    const [URLData, setURLData] = useState(jsonObj);
    const [openAlert, setOpenAlert] = useState(false);
    const [authAlert, setAuthAlert] = useState(!isAuth && location?.state?.displayTempMessage ? true : false);
    const URLID = useParams().id;
    const navigate = useNavigate();
    const isInitialMount = useRef(true);

    const setURLInfo = (res) => {
        setURLData(Object(res));
        setURLCategory(res.category);
        setURLTitle(res.title);

    }

    useEffect(() => {
        async function getURLData() {
            if (isInitialMount.current) {
                isInitialMount.current = false;
                const res = await get_url_info(URLID);
                setURLInfo(res);
            }
        }
        getURLData();
    });

    const handleCategoryChange = (event) => {
        setURLCategory(event.target.value);
    }

    const handleURLTitleInput = (event) => {
        setURLTitle(event.target.value);
    }

    const importURL = async () => {
        const { originalURL, shortURL, userID, img, title, category } = URLData;
        try {
            const res = await import_url(originalURL, shortURL, userID, img, title, category);
            setURLInfo(res);
            navigate(`../my/urls/${res._id}`, { replace: true })

        } catch (error) {
            console.log(error.message);

        }
    }

    const deleteURL = async () => {
        let urlID = URLID;
        try {
            const res = await delete_url(urlID);
            navigate('/');
            console.log(res);

        } catch (error) {
            console.log(error.message);

        }
    }

    const updateURL = async () => {
        let urlID = URLID;
        try {
            await update_url_info(urlID, URLTitle, URLCategory);
            setOpenAlert(true);

        } catch (error) {
            console.log(error.message);

        }
    }

    return (
        <Container component="main" sx={ContainerStyle}>
            <CssBaseline />
            <URLImg alt={URLData.title}
                imgURL={URLData.img}
                width={{ xs: '100%', md: '60%' }} height={{ xs: '50%', md: '25%' }} />
            <URLInfo URL_category={URLCategory} URLTitle={URLTitle} URL={URLData.shortURL}
                setURLTitle={handleURLTitleInput} setURLCategory={handleCategoryChange} isURLDisabled={true} />
            {
                isAuth && currentUserID === URLData.userID &&

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: 1,
                        marginBottom: 3
                    }}>
                    <Fab color="default" aria-label="edit" sx={{ margin: 1 }} onClick={() => updateURL()}>
                        <EditIcon />
                    </Fab>

                    <Fab color="error" aria-label="delete" sx={{ margin: 1 }} onClick={() => deleteURL()}>
                        <DeleteIcon />
                    </Fab>
                </Box>
            }
            {
                isAuth && currentUserID !== URLData.userID &&
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>

                    <Button color="primary" variant='contained' aria-label="add to my urls" sx={{ margin: 1 }} onClick={() => importURL()}>
                        Add to My URLs
                    </Button>
                </Box>
            }

            <Snackbar open={openAlert} autoHideDuration={4000} onClose={() => { setOpenAlert(false) }}>
                <Alert onClose={() => { setOpenAlert(false) }} severity="success" sx={{ width: '100%' }}>
                    Updated!
                </Alert>
            </Snackbar>

            <Snackbar open={authAlert} autoHideDuration={4000} onClose={() => { setAuthAlert(false) }}>
                <Alert onClose={() => { setAuthAlert(false) }} severity="success" sx={{ width: '100%' }}>
                    Your URL will ba valid for 12 hours!
                </Alert>
            </Snackbar>
        </Container>
    );
}