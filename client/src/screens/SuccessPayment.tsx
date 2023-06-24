import { Box, Button, Typography } from "@mui/material";
import { fontSizes } from "../components/shared/styles";
import { useNavigate } from "react-router-dom";

const SuccessPayment = () => {
 const navigate = useNavigate();

 return (
  <Box
   height="90vh"
   marginX={10}
   display="flex"
   flexDirection="column"
   marginTop={5}
   alignItems="center"
  >
   <Typography fontSize={fontSizes.xLarge} fontWeight={500} lineHeight={2}>
    Your order was confirmed
   </Typography>
   <Typography fontSize={fontSizes.medium} fontWeight={500} lineHeight={2}>
    Order ID: 1234
   </Typography>
   <Typography fontSize={fontSizes.medium} lineHeight={2}>
    We have sent your order confirmation to email@email.com
   </Typography>
   <Button
    onClick={() => navigate("/")}
    variant="contained"
    sx={{ marginY: 2, textTransform: "none" }}
   >
    Continue shopping
   </Button>
  </Box>
 );
};

export default SuccessPayment;
