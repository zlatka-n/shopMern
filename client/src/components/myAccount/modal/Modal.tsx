import {
 Modal as MuiModal,
 Box,
 Typography,
 Button,
 Grid,
} from "@mui/material";
import { Control } from "react-hook-form";
import { Address } from "../../../api/types";
import { Input } from "../../shared/Input";
import { styles } from "../styles";
import { editAddressData } from "../utils";

type Props = {
 open: boolean;
 onClose: () => void;
 onSubmit: () => void;
 title: string;
 control: Control<Omit<Address, "_id">>;
};

export const Modal = ({ open, onClose, title, onSubmit, control }: Props) => {
 return (
  <MuiModal
   sx={{
    display: "flex",
    p: 1,
    alignItems: "center",
    justifyContent: "center",
   }}
   open={open}
   onClose={onClose}
   aria-labelledby="modal-title"
   aria-describedby="modal-description"
  >
   <Box className={styles.modalContainer}>
    <Typography variant="h6" component="h2" id="modal-title">
     {title}
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
      sx={{ paddingBlock: "1rem" }}
     >
      Submit
     </Button>
    </form>
   </Box>
  </MuiModal>
 );
};
