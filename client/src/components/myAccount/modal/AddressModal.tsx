import { Box, Button, Modal, Typography } from "@mui/material";
import { FieldValues, UseFormReset } from "react-hook-form";
import { putAddress } from "../../../api/myaccount";
import { Input } from "../../shared/Input";
import { styles } from "../styles";

type Props = {
 control: any;
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
 const onSubmit = handleSubmit(async (data: any) => {
  const areFieldsChanged = Object.keys(dirtyFields).length;

  if (areFieldsChanged > 0) putAddress(data);

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
     <Input
      name={`address`}
      control={control}
      sx={{ backgoundColor: "blue" }}
      minRows={4}
     />
     <Input name={`zipCode`} control={control} />
     <Input name={`city`} control={control} />
     <Input name={`country`} control={control} />
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
