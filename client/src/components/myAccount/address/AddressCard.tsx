import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Address } from "../../../api/types";
import { AddressModal } from "../modal/AddressModal";

type Props = {
 addresses: Address[];
};

export const AddressCard = ({ addresses }: Props) => {
 const [open, setOpen] = useState(false);

 const handleClose = () => setOpen(false);

 const {
  control,
  setValue,
  handleSubmit,
  formState: { dirtyFields },
  reset,
 } = useForm();

 const onEditClick = (id: string) => () => {
  setOpen(true);

  const addressForEdit = addresses?.filter((address) => address._id === id);

  for (const [key, value] of Object.entries(addressForEdit[0])) {
   setValue(`${key}`, value);
  }
 };

 return (
  <Grid container>
   {addresses?.length > 0
    ? addresses.map(
       ({ address, city, zipCode, country, additionalInfo, _id }) => {
        return (
         <Grid item key={_id}>
          <Typography>{address}</Typography>
          <Typography>{city}</Typography>
          <Typography>{zipCode}</Typography>
          <Typography>{country}</Typography>
          {additionalInfo ? <Typography>{additionalInfo}</Typography> : null}
          <Button variant="outlined" onClick={onEditClick(_id)}>
           Edit
          </Button>
         </Grid>
        );
       }
      )
    : null}
   <AddressModal
    control={control}
    handleClose={handleClose}
    open={open}
    handleSubmit={handleSubmit}
    dirtyFields={dirtyFields}
    reset={reset}
   />
  </Grid>
 );
};
