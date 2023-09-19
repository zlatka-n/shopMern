import { Typography, Grid } from '@mui/material';
import { useMemo } from 'react';
import {
  formatCamelCaseWord,
  setFirsLetterUpperCase,
} from '../../shared/utils';
import { Details as DetailsType } from '../../api/types';

type Props = {
 details?: DetailsType;
};

export function Details({ details }: Props) {
  const showDetails = useMemo(() => (details
    ? Object.keys(details).map((key) => {
      const title = key === 'publicationDate'
        ? formatCamelCaseWord(key)
        : setFirsLetterUpperCase(key);
      return (
        <Grid item xs={6} key={details[key]}>
          <Typography>{`${title}: ${details[key]}`}</Typography>
        </Grid>
      );
    })
    : null), [details]);
  return (
    <>
      <Typography lineHeight={2}>Details</Typography>
      <Grid container>{showDetails}</Grid>
    </>
  );
}
