import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { DRAWER_WIDTH } from 'constant';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface AppHeaderProps {
  open: boolean;
  setOpen: () => void;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  width: 'auto',
  zIndex: theme.zIndex.drawer + 1,
  willChange: 'left',
  transition: theme.transitions.create(['left'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  left: `calc(${theme.spacing(12.5)} + 1px)`,
  ...(open && {
    left: DRAWER_WIDTH,
    transition: theme.transitions.create(['left'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppHeader = ({ open, setOpen }: AppHeaderProps) => {
  return (
    <AppBar
      sx={{
        backdropFilter: 'saturate(50%) blur(8px)',
        backgroundColor: 'rgba(255,255,255,.7)',
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px',
      }}
      color='default'
      position='fixed'
      open={open}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={setOpen}
          edge='start'
          sx={{ marginRight: 2 }}
        >
          {open ? <KeyboardDoubleArrowLeftIcon /> : <MenuIcon />}
        </IconButton>
        <Typography variant='h6' noWrap color='inherit'>
          Dashboard
        </Typography>

        {/* Elimină AvatarGroup și IconButton-urile */}
        {/* Poți adăuga aici alte elemente, dacă este necesar */}
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
