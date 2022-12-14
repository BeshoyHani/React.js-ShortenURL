import Box from "@mui/material/Box";
import { URLItem } from "./URLItem";
import WorkIcon from '@mui/icons-material/Work';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import MovieIcon from '@mui/icons-material/Movie';
import AllIcon from '@mui/icons-material/FormatAlignJustify';
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Pagination from '@mui/material/Pagination';
import { useState, useEffect, useRef } from 'react';
import { get_my_urls } from "../../config/shorten_URL_API";
import { get_urls_count } from './../../config/shorten_URL_API';
import Alert from '@mui/material/Alert';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles(() => ({
    ul: {
        "& .MuiPaginationItem-root": {
            color: "#fff"
        }
    }
}));

export const URLList = () => {

    const tabs = [
        { icon: <AllIcon />, name: 'All' },
        { icon: <WorkIcon />, name: 'Work' },
        { icon: <MenuBookIcon />, name: 'Study' },
        { icon: <MovieIcon />, name: 'Movies' },
        { icon: <AudiotrackIcon />, name: 'Music' },
    ];

    const [tabValue, setTabValue] = useState('All');
    const [urlList, setUrlList] = useState([' ']);
    const [page, setPage] = useState(1);
    const [maxPageNo, setMAxPAgeNo] = useState(10);
    const isInitialMount = useRef(true);
    const classes = useStyles();

    const handleNavBarChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const handlePageChange = (event, value) => {
        setPage(value);
        featchURLsData(value, 'all')
    };

    const featchURLsData = async (pageNo, category) => {
        try {
            const res = await get_my_urls(pageNo, category);
            setUrlList(res);
        } catch (error) {
            console.log(error.message);
        }
    }

    const getURLPagesCount = async (category) => {
        try {
            const res = await get_urls_count(category);
            setMAxPAgeNo(parseInt(res.count));
        } catch (error) {
            console.log(error.message);
        }
    }

    const changeCategory = async (category) => {
        try {
            await getURLPagesCount(category);
            await featchURLsData(1, category); // Alwayes start wih page No 1
        } catch (error) {
            console.log(error.meg);
        }
    }

    useEffect(() => {
        async function getURLData() {
            if (isInitialMount.current) {
                isInitialMount.current = false;
                await getURLPagesCount('all');
                await featchURLsData(page, 'all');
            }
        }
        getURLData();
        const scrollableDiv = document.getElementById('url_list_container');
        scrollableDiv?.scrollTo(0, 0)
    });
    return (
        <Box>
            {
                urlList.length ?
                    <Box id="url_list_container" sx={{ overflowX: 'hidden', height: '83vh', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', bottom: '60px', top: '5px' }}>
                        {
                            urlList.map(url => {
                                return (
                                    <Link to={`${url._id}`} key={`${url._id}`} style={{ textDecoration: 'none', width: '100%', display: 'flex', justifyContent: 'center' }}>
                                        <URLItem imageURL={url.img} title={url.title} shortURL={url.shortURL} />
                                    </Link>


                                )
                            })
                        }
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: 1,
                            padding: 1,
                        }}>
                            <Pagination count={maxPageNo} page={page} classes={{ ul: classes.ul }} onChange={handlePageChange} color='primary' />
                        </Box>
                    </Box>
                    :
                    <Alert severity="error" sx={{ width: '100%', }}> Oops! No URLs found</Alert>
            }
            <BottomNavigation value={tabValue} onChange={handleNavBarChange}
                style={{
                    position: 'fixed',
                    bottom: 0,
                    width: '100%',
                    marginTop: 5
                }}>
                {tabs.map(tab =>
                    <BottomNavigationAction key={tab.name} label={tab.name} value={tab.name}
                        icon={tab.icon} onClick={() => changeCategory(tab.name)} />
                )}
            </BottomNavigation>


        </Box >


    );
}