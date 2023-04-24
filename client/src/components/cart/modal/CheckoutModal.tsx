import { Button, Modal as MuiModal, Stack, Typography } from "@mui/material";
import { styles } from "../../myAccount/styles";
import { useNavigate } from "react-router-dom";

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
 const navigate = useNavigate();

 return (
  <MuiModal
   sx={{
    display: "flex",
    p: 1,
    alignItems: "center",
    justifyContent: "center",
    opacity: "0.5",
   }}
   open={open}
   onClose={onClose}
  >
   <div className={styles.modalContainer}>
    <Typography>Item added to your basket</Typography>

    <Typography>
     You have {totalQty} items in your basket for {totalPrice}.
    </Typography>
    <Stack gap={2} direction={"row"}>
     <Button
      onClick={() => navigate("/cart")}
      variant="contained"
      sx={{ marginY: 2, textTransform: "none" }}
     >
      Checkout
     </Button>
     <Button
      onClick={onClose}
      variant="contained"
      sx={{ marginY: 2, textTransform: "none" }}
     >
      Continue shopping
     </Button>
    </Stack>
   </div>
  </MuiModal>
 );
};
