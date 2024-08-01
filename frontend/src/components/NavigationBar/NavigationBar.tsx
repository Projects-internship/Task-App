import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { memo } from 'react';

const NavigationBar = () => {
  const theme = useTheme();

  return (
    <Box
      width='fit-content'
      minHeight='100%'
      borderRadius={2}
      p={1}
      bgcolor={alpha(theme.palette.primary.light, 0.12)}
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      alignItems='center'
      boxShadow={`rgba(33, 35, 38, 0.1) 0px 10px 10px -10px`}
    >
      <Box display='flex' flexDirection='column'>
        <Tooltip title='Home' placement='right' arrow>
          <IconButton
            sx={{
              marginBottom: 1,
              backgroundColor: '#fff',
              boxShadow: theme.shadows[3],
              borderRadius: 2,
              pointerEvents: 'none',
            }}
            size='large'
            color='default'
            aria-label='home'
          >
            <HomeOutlinedIcon fontSize='inherit' />
          </IconButton>
        </Tooltip>
        <Tooltip title='Notifications' placement='right' arrow>
          <IconButton
            sx={{ marginBottom: 1 }}
            size='large'
            color='default'
            aria-label='notification'
          >
            <NotificationsNoneOutlinedIcon fontSize='inherit' />
          </IconButton>
        </Tooltip>
        <Tooltip title='Messages' placement='right' arrow>
          <IconButton sx={{ marginBottom: 1 }} size='large' color='default' aria-label='message'>
            <TextsmsOutlinedIcon fontSize='inherit' />
          </IconButton>
        </Tooltip>
        {/* Butonul Categories a fost eliminat */}
        <Tooltip title='Users' placement='right' arrow>
          <IconButton sx={{ marginBottom: 1 }} size='large' color='default' aria-label='users'>
            <PeopleAltOutlinedIcon fontSize='inherit' />
          </IconButton>
        </Tooltip>
        <Tooltip title='Statistics' placement='right' arrow>
          <IconButton size='large' color='default' aria-label='analytics'>
            <AssessmentOutlinedIcon fontSize='inherit' />
          </IconButton>
        </Tooltip>
      </Box>

      <Box display='flex' flexDirection='column'>
        <Tooltip title='Settings' placement='right' arrow>
          <IconButton sx={{ marginBottom: 2 }} size={'large'} color='default' aria-label='settings'>
            <SettingsOutlinedIcon fontSize='inherit' />
          </IconButton>
        </Tooltip>
        <Tooltip title='Log out' placement='right' arrow>
          <IconButton size={'large'} color='default' aria-label='log out'>
            <LogoutOutlinedIcon fontSize='inherit' />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default memo(NavigationBar);
