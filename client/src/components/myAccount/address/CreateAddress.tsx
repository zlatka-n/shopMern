import { Box, Grid, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Modal } from "../modal/Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Address, UserAddress } from "../../../api/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { addressValidationSchema } from "../types";
import { postAddress } from "../../../api/myaccount";
import { useMutation, useQueryClient } from "react-query";
import { v4 as uuidv4 } from "uuid";

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

 const queryClient = useQueryClient();

 const { mutate } = useMutation(
  (address: Omit<Address, "_id">) => postAddress(address),
  {
   onMutate: async (newAddress) => {
    await queryClient.cancelQueries({ queryKey: ["addresses"] });

    const previousData: Partial<UserAddress> =
     queryClient.getQueryData("addresses") ?? {};

    const newData = {
     _id: previousData._id,
     userInfo: previousData.userInfo,
     addresses: [
      ...(previousData.addresses ?? []),
      { ...newAddress, _id: uuidv4() },
     ],
    };

    queryClient.setQueryData("addresses", newData);

    return { previousData, newAddress };
   },
   onError: (err, newAddress, context) => {
    console.warn(`Error: ${err} during post ${JSON.stringify(newAddress)}`);
    queryClient.setQueryData("addreses", context?.previousData);
   },
   onSettled: () => queryClient.invalidateQueries("addresses"),
  }
 );

 const { control, handleSubmit, reset } = useForm<Omit<Address, "_id">>({
  mode: "onSubmit",
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
