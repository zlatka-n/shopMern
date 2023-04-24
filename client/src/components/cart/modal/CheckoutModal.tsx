import { Modal as MuiModal, Typography } from "@mui/material";
import { styles } from "../../myAccount/styles";

type Props = {
 open: boolean;
 onClose: () => void;
 totalQty?: number;
 totalPrice?: number;
};

export const CheckoutModal = ({
 open,
 onClose,
 totalQty,
 totalPrice,
}: Props) => {
 return (
  <MuiModal
   sx={{
    display: "flex",
    p: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
   }}
   open={open}
   onClose={onClose}
  >
   <div className={styles.modalContainer}>
    <Typography>Item added to your basket</Typography>

    <Typography>
     You have {totalQty} items in your basket for {totalPrice}.
    </Typography>
   </div>
  </MuiModal>
 );
};
