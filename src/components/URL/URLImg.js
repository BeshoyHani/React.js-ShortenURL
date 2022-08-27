import Box from '@mui/material/Box';

export const URLImg = ({ imgURL, alt }) => {
    return (
        <Box
            component="img"
            sx={{
                margin: 2,
                height: 200,
                width: 150,
                maxHeight: { xs: 500, md: 400 },
                maxWidth: { xs: 350, md: 250 },
            }}
            alt={alt}
            src={imgURL}
        />
    );
}