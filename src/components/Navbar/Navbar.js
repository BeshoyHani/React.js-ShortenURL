import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import AdbIcon from '@mui/icons-material/Home';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

let settingsItems = [
    { 'name': 'Login', 'url': '/login' },
    //{ 'name': 'Account', 'url': '' },
    { 'name': 'My URLs', 'url': 'my/urls' },
    { 'name': 'Logout', 'url': '/logout' },
];


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


export const Navbar = ({ username, isAuth }) => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [settings, setSettings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setSettings(() =>
            isAuth === true ?
                settingsItems.filter(item => item.name.toLocaleLowerCase() !== 'login')
                :
                settingsItems.filter(item => item.name.toLocaleLowerCase() === 'login'));

    }, [isAuth])

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSearchQuery = (event) => {
        const value = event.target.value;
        setSearchValue(value);
        if (value.length) {
            setTimeout(() => {
                navigate(`/search/${value}`);
            }, 1000)
        }
    }

    const handleSearchSubmit = (event) => {
        if (event.key === "Enter" && searchValue.length > 0) {
            navigate(`/search/${searchValue}`);
        }
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }} >
                    <Box sx={{ display: 'flex' }}>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Home
                        </Typography>

                    </Box>


                    <Box sx={{ display: 'flex' }}>
                        {
                            isAuth &&
                            <Search sx={{ marginRight: 3 }}>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search???"
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={searchValue}
                                    autoFocus
                                    onChange={handleSearchQuery}
                                    onKeyUp={handleSearchSubmit}
                                />
                            </Search>
                        }

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar sx={{ bgcolor: blue[500] }}>{username[0]}</Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {
                                    settings.map((setting) => (
                                        <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                                            <Link to={setting.url} style={{ textDecoration: 'none', color: 'black' }}>
                                                <Typography textAlign="center">{setting.name}</Typography>
                                            </Link>
                                        </MenuItem>

                                    ))}
                            </Menu>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
