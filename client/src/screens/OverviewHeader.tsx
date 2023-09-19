import { Typography } from '@mui/material';
import { fontSizes } from '../components/shared/styles';

type Props = {
 heading: string;
 text: string;
};

export function OverviewHeader({ heading, text }: Props) {
  return (
    <>
      <Typography fontSize={fontSizes.xLarge}>{heading}</Typography>
      <Typography paddingY={2}>
        {text}
        {' '}
      </Typography>
    </>
  );
}
