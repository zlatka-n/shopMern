// import { useFormState } from 'react-dom';
import {
  Modal as MuiModal,
  Box,
  Typography,
  Button,
  Grid,
  TextField,
} from '@mui/material';
import { styles } from '../styles';
import { editAddressData } from '../utils';
// import { getAddresses, putAddress } from '../../../api/myaccount';
import { Address } from '../../../api/types';

type Props = {
  open: boolean;
  onClose: () => void;
  addOptimisticAddress: any;
  setData: React.Dispatch<React.SetStateAction<Address[] | undefined>>;
  addressDefValues?: Address;
};

export function EditModal({
  open,
  onClose,
  addOptimisticAddress,
  setData,
  addressDefValues,
}: Props) {
  return (
    <MuiModal
      sx={{
        display: 'flex',
        p: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box className={styles.modalContainer}>
        <Typography variant="h6" component="h2" id="modal-title">
          Edit your address
        </Typography>
        <form
          id="modal-description"
          className={styles.flexAlignment}
          //   action={formAction}
        >
          <Grid
            container
            gap={2}
            flexDirection="column"
            alignItems="center"
            marginY={5}
          >
            {editAddressData.map((item) => (
              <TextField
                name={item.value}
                id="outlined-required"
                label={item.name}
                key={item.value}
                defaultValue={
                  addressDefValues
                    ? addressDefValues[item.value as keyof Address]
                    : ''
                }
              />
            ))}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ paddingBlock: '1rem' }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </MuiModal>
  );
}
