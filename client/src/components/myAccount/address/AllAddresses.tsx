/* eslint-disable indent */
import { useEffect, useMemo, useOptimistic, useState } from 'react';
import { Grid } from '@mui/material';
import { getAddresses } from '../../../api/myaccount';
import { Address } from '../../../api/types';
import { AddressCard } from './AddressCard';
import { CreateAddress } from './CreateAddress';
import { useHandleModal } from '../../../shared/utils';
import { EditModal } from '../modal/EditModal';

export function AllAddresses() {
  const [addressId, setAddressId] = useState<string | undefined>();
  const [data, setData] = useState<Address[]>();
  const [optimisticAddresses, addOptimisticAddress] = useOptimistic(
    data,
    (state: Address[], newAddress: Address) => {
      const filteredData = state.filter(({ _id }) => _id !== newAddress._id);
      return [...filteredData, newAddress];
    }
  );

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

  const addressInEdit = useMemo(
    () => data?.find(({ _id }) => _id === addressId),
    [addressId, data]
  );

  const { open, handleClose, handleOpen } = useHandleModal();

  const onEditClick = (id: string) => () => {
    handleOpen();
    setAddressId(id);
  };

  return (
    <Grid container alignItems="center" gap={4}>
      {/* {data?.length < 3 ? ( */}
      <Grid item md={3.5} xs={11} border="1px solid">
        <CreateAddress />
      </Grid>
      {/* ) : null} */}
      {optimisticAddresses?.length > 0
        ? optimisticAddresses.map(
            ({
              address,
              city,
              zipCode,
              country,
              additionalInfo,
              _id,
            }: Address) => (
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
      <EditModal
        open={open}
        onClose={handleClose}
        addOptimisticAddress={addOptimisticAddress}
        setData={setData}
        addressDefValues={addressInEdit}
      />
    </Grid>
  );
}
