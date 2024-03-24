/* eslint-disable indent */
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { getAddresses, putAddress } from '../../../api/myaccount';
import { Address } from '../../../api/types';
import { Modal } from '../modal/Modal';
import { addressValidationSchema } from '../types';
import { AddressCard } from './AddressCard';
import { CreateAddress } from './CreateAddress';
import { useHandleModal } from '../../../shared/utils';
import { EditModal } from '../modal/EditModal';

export function AllAddresses() {
  const [addressId, setAddressId] = useState<string | undefined>();
  const [data, setData] = useState<Address[]>();

  const { open, handleClose, handleOpen } = useHandleModal();
  const queryClient = useQueryClient();

  const { mutate } = useMutation((address) => putAddress(address), {
    onSuccess: () => queryClient.invalidateQueries('addresses'),
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await getAddresses();
        setData(response?.addresses);
      } catch (error) {
        throw error;
      }
    };

    fetchAddresses();
  }, []);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { dirtyFields },
    reset,
  } = useForm<Omit<Address, '_id'>>({
    resolver: yupResolver(addressValidationSchema),
  });

  const onEditClick = (id: string) => () => {
    handleOpen();
    const addressForEdit = data?.filter((address) => address._id === id) ?? [];

    for (const property in addressForEdit[0]) {
      setValue(
        `${property as keyof Omit<Address, '_id'>}`,
        addressForEdit[0][property as keyof Omit<Address, '_id'>]
      );
    }
  };

  const onSubmitEditAddress = handleSubmit(async (data: any) => {
    const areFieldsChanged = Object.keys(dirtyFields).length;

    if (areFieldsChanged === 0) handleClose();

    mutate(data);

    reset({}, { keepValues: true });

    handleClose();
  });

  return (
    <Grid container alignItems="center" gap={4}>
      {/* {data?.length < 3 ? ( */}
      <Grid item md={3.5} xs={11} border="1px solid">
        <CreateAddress />
      </Grid>
      {/* ) : null} */}
      {data && data?.length > 0
        ? data?.map(
            ({ address, city, zipCode, country, additionalInfo, _id }) => (
              <Grid item key={_id} md={3.5} xs={11}>
                <AddressCard
                  address={address}
                  city={city}
                  zipCode={zipCode}
                  country={country}
                  additionalInfo={additionalInfo}
                  onClick={onEditClick(_id)}
                  _id={_id}
                />
              </Grid>
            )
          )
        : null}
      <Modal
        open={open}
        control={control}
        onClose={handleClose}
        title="Edit your address"
        onSubmit={onSubmitEditAddress}
      />
      {/* <EditModal
        open={open}
        onClose={handleClose}
      /> */}
    </Grid>
  );
}
