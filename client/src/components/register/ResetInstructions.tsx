import { Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import { resetInstructions } from './utils';
import { fontSizes } from '../shared/styles';

export type Props = {
 email: string;
};
export function ResetInstructions({ email }: Props) {
  return (
    <>
      <Typography fontSize={fontSizes.large}>Renew your password</Typography>
      <Typography display="flex" alignContent="center" gap={1}>
        <CheckCircleIcon color="success" />
        {`Instructions for renewal were sent to ${email}`}
      </Typography>
      <div>
        <Typography>Did not receive your recovery link?</Typography>
        {resetInstructions.map(({ instruction }, index) => (
          <Typography lineHeight={1.5} key={instruction}>
            {`${
              index + 1
            }. ${instruction}`}
          </Typography>
        ))}
      </div>
      <Link to="/account/login" style={{ textDecoration: 'none' }}>
        {' '}
        <Typography color="primary" textTransform="none">
          Back to login
        </Typography>
      </Link>
    </>
  );
}
