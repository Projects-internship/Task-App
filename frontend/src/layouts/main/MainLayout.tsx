import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Fade from '@mui/material/Fade';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import React, { useReducer } from 'react';
import { Outlet } from 'react-router-dom';

import AppHeader from 'components/AppHeader';
import NavigationBar from 'components/NavigationBar';
import Sidebar from 'components/Sidebar';
import { DRAWER_WIDTH } from 'constant';

// Mixin pentru drawer deschis
const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

// Mixin pentru drawer închis
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(12.5)} + 1px)`,
});

// Header pentru drawer
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

// Componenta Drawer
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

// Componenta principală
const MainLayout: React.FC = () => {
  const theme = useTheme();
  const [open, setOpen] = useReducer((state) => !state, false); // Toggle pentru drawer

  return (
    <Box display='flex'>
      <AppHeader open={open} setOpen={setOpen} />
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
        <Outlet /> {/* Aici se va reda conținutul paginii principale */}
      </Box>
    </Box>
  );
};

export default MainLayout;
