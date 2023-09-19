import { Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { fontSizes } from '../shared/styles';
import { styles } from './styles';
import { sidebarItems } from './utils';

export function Sidebar() {
  return (
    <Stack gap={1}>
      <Typography fontSize={fontSizes.medium} fontWeight={500}>
        Your account
      </Typography>
      {sidebarItems.map(({ link, name }) => (
        <Typography fontSize={fontSizes.small} key={link}>
          <NavLink
            to={link}
            className={(navData) => (navData.isActive ? styles.active : '')}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            {name}
          </NavLink>
        </Typography>
      ))}
    </Stack>
  );
}
