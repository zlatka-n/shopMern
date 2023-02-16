import { Button, Grid, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Address } from "../../../api/types";
import { AddressModal } from "../modal/AddressModal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
type Props = {
 addresses: Address[];
};

export const AllAddresses = ({ addresses }: Props) => {
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

  for (const property in addressForEdit[0]) {
   setValue(`${property}`, addressForEdit[0][property as keyof Address]);
  }
 };

 return (
  <Grid container alignItems="center" justifyContent={"space-between"}>
   <Grid item xs={4}>
    <Grid container justifyContent={"center"}>
     <IconButton>
      <AddCircleIcon />
     </IconButton>
    </Grid>
   </Grid>
   {addresses?.length > 0
    ? addresses.map(
       ({ address, city, zipCode, country, additionalInfo, _id }) => {
        return (
         <Grid item key={_id} xs={4}>
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
