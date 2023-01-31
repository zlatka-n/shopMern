import { Box, Typography } from "@mui/material";
import { styles } from "../styles";

export const AddressModal = () => {
 return (
  <Box className={styles.addressModalContent}>
   <Typography id="modal-modal-title" variant="h6" component="h2">
    Edit your address
   </Typography>
   <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
   </Typography>
  </Box>
 );
};
