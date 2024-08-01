import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Fade from '@mui/material/Fade';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { useReducer } from 'react';
import { Outlet } from 'react-router-dom';

import AppHeader from 'components/AppHeader';
import NavigationBar from 'components/NavigationBar';
import Sidebar from 'components/Sidebar';
import { DRAWER_WIDTH } from 'constant';

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(12.5)} + 1px)`,
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MainLayout() {
  const theme = useTheme();
  const [open, setOpen] = useReducer((state) => !state, false);

  return (
    <Box display='flex'>
      <AppHeader {...{ open, setOpen }} />
      <Drawer variant='permanent' open={open}>
        <Box component='aside' display='flex' p={2} minHeight='100%'>
          <NavigationBar />
          <Fade in={open} unmountOnExit>
            <Box
              sx={{
                width: '100%',
                ml: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Sidebar />
            </Box>
          </Fade>
        </Box>
      </Drawer>
      <Box
        component='main'
        sx={{ flexGrow: 1, minHeight: '100vh', p: 2, bgcolor: theme.palette.background.default }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
