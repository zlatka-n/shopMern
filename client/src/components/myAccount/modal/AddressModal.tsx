import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { Control, FieldValues, UseFormReset } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getAddresses, putAddress } from "../../../api/myaccount";
import { setAddresses } from "../../../redux/userInfoSlice";
import { Input } from "../../shared/Input";
import { styles } from "../styles";
import { editAddressData } from "../utils";

type Props = {
 control: Control<any>;
 handleClose: () => void;
 handleSubmit: (data: any) => any;
 open: boolean;
 dirtyFields: Partial<
  Readonly<{
   [x: string]: any;
  }>
 >;
 reset: UseFormReset<FieldValues>;
};

export const AddressModal = ({
 control,
 handleClose,
 open,
 handleSubmit,
 reset,
 dirtyFields,
}: Props) => {
 const dispatch = useDispatch();

 const onSubmit = handleSubmit(async (data: any) => {
  const areFieldsChanged = Object.keys(dirtyFields).length;

  if (areFieldsChanged === 0) return;

  const updatedAddress = await putAddress(data);

  if (updatedAddress) {
   const newAddress = await getAddresses();
   dispatch(setAddresses(newAddress.addresses));
  }

  reset({}, { keepValues: true });

  handleClose();
 });

 return (
  <Modal
   sx={{
    display: "flex",
    p: 1,
    alignItems: "center",
    justifyContent: "center",
   }}
   open={open}
   onClose={handleClose}
   aria-labelledby="modal-title"
   aria-describedby="modal-description"
  >
   <Box className={styles.modalContainer}>
    <Typography variant="h6" component="h2" id="modal-title">
     Edit your address
    </Typography>
    <form
     id="modal-description"
     className={styles.flexAlignment}
     onSubmit={onSubmit}
    >
     <Grid
      container
      gap={2}
      flexDirection="column"
      alignItems="center"
      marginY={5}
     >
      {editAddressData.map((item) => (
       <Input
        name={item.value}
        control={control}
        id="outlined-required"
        label={item.name}
        key={item.value}
       />
      ))}
     </Grid>
     <Button
      onClick={onSubmit}
      variant="contained"
      sx={{ paddingBlock: "1em" }}
     >
      Submit
     </Button>
    </form>
   </Box>
  </Modal>
 );
};
