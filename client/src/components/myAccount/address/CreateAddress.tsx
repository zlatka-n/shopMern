import { Grid, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Modal } from "../modal/Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Address } from "../../../api/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { addressValidationSchema } from "../types";
import { getAddresses, postAddress } from "../../../api/myaccount";
import { setAddresses } from "../../../redux/userInfoSlice";
import { useDispatch } from "react-redux";

export const CreateAddress = () => {
 const [open, setOpen] = useState(false);
 const handleClose = () => setOpen(false);

 const dispatch = useDispatch();

 const { control, handleSubmit, reset } = useForm<Omit<Address, "_id">>({
  mode: "onSubmit",
  resolver: yupResolver(addressValidationSchema),
 });

 const onSubmit = handleSubmit(async (formData) => {
  const data = await postAddress(formData);

  if (data) {
   const newAddress = await getAddresses();
   dispatch(setAddresses(newAddress.addresses));
  }

  handleClose();
  reset();
 });

 return (
  <Grid container justifyContent={"center"}>
   <IconButton onClick={() => setOpen(true)}>
    <AddCircleIcon />
   </IconButton>
   <Modal
    onClose={handleClose}
    open={open}
    title="Create a new address"
    control={control}
    onSubmit={onSubmit}
   />
  </Grid>
 );
};
