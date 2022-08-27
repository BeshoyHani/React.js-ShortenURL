import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { Fab } from '@mui/material';

export const URLInfo = ({ handleCategoryChange, URL_category, URL, setURL, URLTitle, setURLTitle, isURLDisabled }) => {

    const URL_category_list = [
        'None',
        'Work',
        'Study',
        'Movies',
        'Music',
    ];

    return (
        <Box
            sx={{
                mt: 1,
                py: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 0.7
            }}>
            <Box sx={{ display: 'flex', width:1, justifyContent:'space-between' }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="oURL"
                    label="URL"
                    name="URL"
                    autoComplete="UEL"
                    autoFocus
                    value={URL}
                    disabled={isURLDisabled}
                    onChange={setURL}
                />
                <Fab color="primary" sx={{margin:2}}>
                    <FontAwesomeIcon icon={faCopy} />
                </Fab>
            </Box>

            <Box sx={{ display: 'flex', width: 1 }}>
                <TextField
                    margin="normal"
                    fullWidth
                    name="title"
                    label="Title"
                    type="text"
                    id="title"
                    autoComplete="current-password"
                    value={URLTitle}
                    onChange={setURLTitle}
                    sx={{ mr: 1 }}
                />
                <FormControl
                    fullWidth
                    sx={{ mr: 1 }}
                    margin='normal'>
                    <InputLabel id="category_select_lbl">Category</InputLabel>
                    <Select
                        labelId="category_select_lbl"
                        id="category_select"
                        value={URL_category}
                        label="Age"
                        onChange={handleCategoryChange}
                    >
                        {URL_category_list.map(category => <MenuItem key={category} value={category}>{category}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>
            {/*false &&
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
        */}
        </Box>
    );
}