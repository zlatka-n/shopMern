import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Logo from './logo.svg?react';

interface CompanyLogoProps {
  fontColor?: string;
}

export function CompanyLogo({ fontColor }: CompanyLogoProps) {
  return (
    <Link
      to="/"
      style={{
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <Logo />
      <Typography color={fontColor}>Bookish</Typography>
    </Link>
  );
}
