import { Box } from '@mui/material';
import { OverviewHeader } from '../../../screens/OverviewHeader';
import { ADDRESSES } from '../utils';
import { AllAddresses } from './AllAddresses';

export function Address() {
  return (
    <Box maxWidth="75vw">
      <OverviewHeader
        heading={ADDRESSES}
        text="Here you can add or edit your adresses"
      />
      <AllAddresses />
    </Box>
  );
}
