import { Button, Grid, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { Address } from "../../api/types";
import { AddressModal } from "./modal/AddressModal";

type Props = {
 addresses: Address[];
};

export const AddressCard = ({ addresses }: Props) => {
 const [open, setOpen] = useState(false);

 const handleClose = () => setOpen(false);

 const onEditClick = (id: string) => () => {
  console.log(id);
  setOpen(true);
 };
 return (
  <Grid container>
   {addresses?.length > 0
    ? addresses.map(
       ({ address, city, zipCode, country, additionalInfo, _id }) => {
        return (
         <Grid item>
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
   <Modal
    sx={{
     display: "flex",
     p: 1,
     alignItems: "center",
     justifyContent: "center",
    }}
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
   >
    <AddressModal />
   </Modal>
  </Grid>
 );
};
