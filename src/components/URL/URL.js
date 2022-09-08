import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import { URLInfo } from './URL_Info';
import { ContainerStyle } from './../../styles/style';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { URLImg } from './URLImg';
import { delete_url } from '../../config/shorten_URL_API';
import { update_url_info, get_url_info } from './../../config/shorten_URL_API';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export const URL = ({ isAuth, firstTime }) => {
    const jsonObj = {
        "_id": "",
        "title": "",
        "category": "",
        "clicks": "",
        "img": "",
        "shortURL": '',
        'userID': ''
    }
    const [URLCategory, setURLCategory] = useState('');
    const [URLTitle, setURLTitle] = useState('');
    const [URLData, setURLData] = useState(jsonObj);
    const [openAlert, setOpenAlert] = useState(false);
    const [authAlert, setAuthAlert] = useState(!isAuth && firstTime? true: false);
    const URLID = useParams().id;
    const navigate = useNavigate();
    const isInitialMount = useRef(true);

    useEffect(() => {
        async function getURLData() {
            if (isInitialMount.current) {
                isInitialMount.current = false;
                const res = await get_url_info(URLID);
                setURLData(Object(res));
                setURLCategory(res.category);
                setURLTitle(res.title);
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
        <Container component="main" sx={{ ...ContainerStyle, width: 0.95 }}>
            <CssBaseline />
            <URLImg alt={URLData.title}
                imgURL={URLData.img} />
            <URLInfo URL_category={URLCategory} URLTitle={URLTitle} URL={URLData.shortURL}
                setURLTitle={handleURLTitleInput} setURLCategory={handleCategoryChange} isURLDisabled={true} />
            {
                isAuth &&

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