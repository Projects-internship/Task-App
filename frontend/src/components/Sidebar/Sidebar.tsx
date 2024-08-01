import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

const Sidebar = () => {
  return (
    <>
      <TextField
        sx={{ mb: 3 }}
        placeholder='Search...'
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchOutlinedIcon />
            </InputAdornment>
          ),
        }}
        variant='standard'
      />
      <Box mb='auto'>
        {/* Placeholder for ProjectsList components */}
        <Box mb={3}>
          <Box sx={{ height: 48, backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
        </Box>
        <Box mb={3}>
          <Box sx={{ height: 48, backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
        </Box>
      </Box>
      <Button variant='contained' disableElevation fullWidth startIcon={<AddOutlinedIcon />}>
        {/* No text inside button */}
      </Button>
    </>
  );
};

export default Sidebar;
