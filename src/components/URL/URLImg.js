import Box from '@mui/material/Box';

export const URLImg = ({ imgURL, alt, width, height }) => {
    return (
        <Box
            component="img"
            sx={{
                margin: 2,
                height: '300',
                width: '500',
                maxHeight: { xs: height.xs, md: height.md },
                maxWidth: { xs: width.xs, md: width.md },
            }}
            alt={alt}
            src={imgURL || 'https://res.cloudinary.com/dpecxlfg2/image/upload/v1662063078/urls_preview/images_rvmnod.png'}
        />
    );
}