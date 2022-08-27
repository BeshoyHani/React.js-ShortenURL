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
import { useState } from 'react';


export const URLList = () => {

    const actions = [
        { icon: <AllIcon />, name: 'All' },
        { icon: <WorkIcon />, name: 'Work' },
        { icon: <MenuBookIcon />, name: 'Study' },
        { icon: <MovieIcon />, name: 'Movies' },
        { icon: <AudiotrackIcon />, name: 'Music' },
    ];

    const [tabValue, setTabValue] = useState('All');
    const [page, setPage] = useState(1);

    const handleNavBarChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (



        <div>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'space-around',
            }}>
                <Box sx={{ overflowX:'hidden', height: '87vh', display: 'inline-block'}}>
                    <URLItem />
                    <URLItem />
                    <URLItem />
                    <URLItem />
                    <URLItem />
                </Box>
                <BottomNavigation value={tabValue} onChange={handleNavBarChange}
                    style={{
                        position: 'fixed',
                        bottom: 0,
                        width: '100%',
                        marginTop: 5
                    }}>
                    {actions.map(action =>
                        <BottomNavigationAction key={action.name} label={action.name} value={action.name} icon={action.icon} />
                    )}
                </BottomNavigation>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: 1,
                    backgroundColor: 'whiteSmoke',
                    padding: 1,
                    position: 'fixed',
                    bottom : '50px',
                }}>
                    <Pagination count={10} page={page} onChange={handlePageChange} color='primary' />
                </Box>
            </Box >
        </div>


    );
}