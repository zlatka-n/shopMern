import { Box, Grid, IconButton } from "@mui/material";
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

const defaultValues = {
 address: "",
 city: "",
 zipCode: "",
 country: "",
 additionalInfo: "",
};

export const CreateAddress = () => {
 const [open, setOpen] = useState(false);
 const handleClose = () => setOpen(false);

 const dispatch = useDispatch();

 const { control, handleSubmit, reset } = useForm<Omit<Address, "_id">>({
  mode: "onSubmit",
  resolver: yupResolver(addressValidationSchema),
  defaultValues,
 });

 const onSubmit = handleSubmit(async (formData) => {
  const data = await postAddress(formData);

  if (data) {
   const newAddress = await getAddresses();
   dispatch(setAddresses(newAddress.addresses));
  }

  handleClose();
  reset(defaultValues);
 });

 return (
  <Grid
   container
   flexDirection="column"
   justifyContent={"center"}
   alignItems="center"
   minHeight={"30rem"}
  >
   <Box>
    <IconButton onClick={() => setOpen(true)}>
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
};
