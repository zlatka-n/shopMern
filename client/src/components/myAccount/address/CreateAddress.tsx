import { Box, Grid, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from '../modal/Modal';
import { Address, UserAddress } from '../../../api/types';
import { addressValidationSchema } from '../types';
import { postAddress } from '../../../api/myaccount';
import { useHandleModal } from '../../../shared/utils';

const defaultValues = {
  address: '',
  city: '',
  zipCode: '',
  country: '',
  additionalInfo: '',
};

export function CreateAddress() {
  const { open, handleClose, handleOpen } = useHandleModal();

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (address: Omit<Address, '_id'>) => postAddress(address),
    {
      onMutate: async (newAddress) => {
        await queryClient.cancelQueries({ queryKey: ['addresses'] });

        const previousData: Partial<UserAddress> = queryClient.getQueryData('addresses') ?? {};

        const newData = {
          _id: previousData._id,
          userInfo: previousData.userInfo,
          addresses: [
            ...(previousData.addresses ?? []),
            { ...newAddress, _id: uuidv4() },
          ],
        };

        queryClient.setQueryData('addresses', newData);

        return { previousData, newAddress };
      },
      onError: (err, newAddress, context) => {
        queryClient.setQueryData('addreses', context?.previousData);
      },
      onSettled: () => queryClient.invalidateQueries('addresses'),
    },
  );

  const { control, handleSubmit, reset } = useForm<Omit<Address, '_id'>>({
    mode: 'onSubmit',
    resolver: yupResolver(addressValidationSchema),
    defaultValues,
  });

  const onSubmit = handleSubmit(async (formData) => {
    mutate(formData);

    handleClose();
    reset(defaultValues);
  });

  return (
    <Grid
      container
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="30rem"
    >
      <Box>
        <IconButton onClick={handleOpen}>
          <AddCircleIcon />
        </IconButton>
      </Box>
      <Modal
        onClose={handleClose}
        open={open}
        title="Create a new address"
        control={control}
        onSubmit={onSubmit}
      />
    </Grid>
  );
}
