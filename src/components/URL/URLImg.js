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
            src={imgURL || 'https://us.123rf.com/450wm/koblizeek/koblizeek1902/koblizeek190200055/125337077-no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-.jpg?ver=6'}
        />
    );
}