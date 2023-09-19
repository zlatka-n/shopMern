import HomeIcon from '@mui/icons-material/Home';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export const topBarBtns = [
  {
    icon: <HomeIcon sx={{ color: 'white' }} />,
    screen: '/',
  },
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
