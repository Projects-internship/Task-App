import { useTheme } from '@emotion/react';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { memo, useState } from 'react';

interface ListProps {
  data: any[];
  title: string;
}

const ProjectsList = ({ data, title = 'Title' }: ListProps) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List sx={{ width: '100%' }} component='nav'>
      <ListItemButton
        sx={{ borderRadius: 2, bgcolor: 'rgba(0, 0, 0, 0.04)' }}
        alignItems='flex-start'
        onClick={handleClick}
      >
        <ListItemText
          primary={title}
          primaryTypographyProps={{
            fontSize: 15,
            fontWeight: 'medium',
            lineHeight: '20px',
          }}
          sx={{ my: 0 }}
        />
        <KeyboardArrowDown
          sx={{
            mr: -1,
            transform: open ? 'rotate(-180deg)' : 'rotate(0)',
          }}
        />
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List sx={{ width: '100%' }} component='div'>
          {data.map((el, i) => (
            <ListItemButton
              selected={i === 0}
              key={el.id}
              sx={{ p: 0, px: 1, borderRadius: 2, minHeight: 32 }}
            >
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: '400',
                }}
                primary={el.name}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default memo(ProjectsList);
