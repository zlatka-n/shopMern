import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export const topBarBtns = [
  {
    icon: <MailOutlineIcon sx={{ color: 'white' }} />,
    screen: '/contact',
    name: 'Contact us',
  },
  {
    icon: <HelpOutlineIcon sx={{ color: 'white' }} />,
    screen: '/help',
    name: 'Help',
  },
];
