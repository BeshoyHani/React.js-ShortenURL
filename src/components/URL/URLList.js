import Box from "@mui/material/Box";
import { URLItem } from "./URLItem";
import WorkIcon from '@mui/icons-material/Work';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import MovieIcon from '@mui/icons-material/Movie';
import AllIcon from '@mui/icons-material/FormatAlignJustify';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Pagination from '@material-ui/lab/Pagination';
import { useState, useEffect, useRef } from 'react';
import { get_my_urls } from "../../config/shorten_URL_API";
import { get_urls_count } from './../../config/shorten_URL_API';
import Alert from '@mui/material/Alert';


export const URLList = () => {

    const tabs = [
        { icon: <AllIcon />, name: 'All' },
        { icon: <WorkIcon />, name: 'Work' },
        { icon: <MenuBookIcon />, name: 'Study' },
        { icon: <MovieIcon />, name: 'Movies' },
        { icon: <AudiotrackIcon />, name: 'Music' },
    ];

    const [tabValue, setTabValue] = useState('All');
    const [category, setCategory] = useState('all');
    const [urlList, setUrlList] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPageNo, setMAxPAgeNo] = useState(10);
    const isInitialMount = useRef(true);

    const handleNavBarChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const handlePageChange = (event, value) => {
        setPage(value);
        featchURLsData(value, category)
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
            await featchURLsData(page, category);
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
    });

    return (
        <Box>
            {
                urlList.length?
                <Box sx={{ overflowX: 'hidden', height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', bottom: '60px', top: '5px' }}>
                    {
                        urlList.map(url => <URLItem key={url._id} imageURL={url.img} title={url.title} shortURL={url.shortURL} />)
                    }
                </Box>
                :
                <Alert severity="error" sx={{ width: '100%',  }}> Oops! No URLs found</Alert>
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

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                width: 1,
                backgroundColor: 'whiteSmoke',
                padding: 1,
                position: 'fixed',
                bottom: '50px',
            }}>
                <Pagination count={maxPageNo} page={page} onChange={handlePageChange} color='primary' />
            </Box>
        </Box >


    );
}