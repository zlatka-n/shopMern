import { Box, Modal, Typography } from "@mui/material";
import { Input } from "../../shared/Input";
import { styles } from "../styles";

type Props = {
 control: any;
 handleClose: () => void;
 open: boolean;
};

export const AddressModal = ({ control, handleClose, open }: Props) => {
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
   <Box className={styles.addressModalContent}>
    <Typography variant="h6" component="h2" id="modal-title">
     Edit your address
    </Typography>
    <form id="modal-description">
     <Input name={`address`} control={control} />
     <Input name={`zipCode`} control={control} />
     <Input name={`city`} control={control} />
     <Input name={`country`} control={control} />
    </form>
   </Box>
  </Modal>
 );
};
