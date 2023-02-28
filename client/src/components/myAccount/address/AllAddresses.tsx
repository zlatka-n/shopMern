import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { putAddress } from "../../../api/myaccount";
import { Address } from "../../../api/types";
import { Modal } from "../modal/Modal";
import { addressValidationSchema } from "../types";
import { AddressCard } from "./AddressCard";
import { CreateAddress } from "./CreateAddress";

type Props = {
 addresses: Address[];
};

export const AllAddresses = ({ addresses }: Props) => {
 const [open, setOpen] = useState(false);
 const handleClose = () => setOpen(false);

 const queryClient = useQueryClient();

 const { mutate } = useMutation((address) => putAddress(address), {
  onSuccess: () => queryClient.invalidateQueries("addresses"),
 });

 const {
  control,
  setValue,
  handleSubmit,
  formState: { dirtyFields },
  reset,
 } = useForm<Omit<Address, "_id">>({
  resolver: yupResolver(addressValidationSchema),
 });

 const onEditClick = (id: string) => () => {
  setOpen(true);

  const addressForEdit = addresses?.filter((address) => address._id === id);

  for (const property in addressForEdit[0]) {
   setValue(
    `${property as keyof Omit<Address, "_id">}`,
    addressForEdit[0][property as keyof Omit<Address, "_id">]
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
   {addresses?.length < 3 ? (
    <Grid item md={3.5} xs={11} border={"1px solid"}>
     <CreateAddress />
    </Grid>
   ) : null}
   {addresses?.length > 0
    ? addresses.map(
       ({ address, city, zipCode, country, additionalInfo, _id }) => {
        return (
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
        );
       }
      )
    : null}
   <Modal
    open={open}
    control={control}
    onClose={handleClose}
    title="Edit your address"
    onSubmit={onSubmitEditAddress}
   />
  </Grid>
 );
};
