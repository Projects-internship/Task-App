import TuneIcon from '@mui/icons-material/Tune';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import HeroProject from 'components/HeroProject';
import TaskTable from 'components/TaskTable';
import UserTable from 'components/UserTable';

const HomePage = () => {
  return (
    <Container disableGutters>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        mt={2}
        mb={2}
      >
        <UserTable />
        <Box mt={2} mb={2}>
          <Divider />
        </Box>
        <TaskTable />
      </Box>
      <Divider />
    </Container>
  );
};

export default HomePage;
