import Box from '@mui/material/Box';

export const URLImg = ({ imgURL, alt }) => {
    return (
        <Box
            component="img"
            sx={{
                margin: 2,
                height: '300',
                width: '500',
                maxHeight: { xs: 200, md: 250 },
                maxWidth: { xs: 100, md: 400 },
            }}
            alt={alt}
            src={imgURL || 'https://res.cloudinary.com/dpecxlfg2/image/upload/v1662063078/urls_preview/images_rvmnod.png'}
        />
    );
}