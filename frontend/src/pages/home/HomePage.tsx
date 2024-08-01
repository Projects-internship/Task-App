import TuneIcon from '@mui/icons-material/Tune';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import HeroProject from 'components/HeroProject';

const HomePage = () => {
  return (
    <Container disableGutters>
      <HeroProject />
      <Divider sx={{ mt: 4 }} />
      <Box display='flex' alignItems='center' justifyContent='space-between' mt={2} mb={2}>
        <Box>
          <Button variant='text' color='inherit' startIcon={<TuneIcon />}>
            {/* No text inside button */}
          </Button>
        </Box>
      </Box>
      <Divider />
      {/* Removed KanbanBoard */}
    </Container>
  );
};

export default HomePage;
