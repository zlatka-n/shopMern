import { Grid, Stack, Typography } from "@mui/material";
import { Cart } from "../../api/types";
import { colors } from "../shared/styles";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

type Props = {
 data: Cart;
};

export const CartSummary = ({ data }: Props) => {
 return (
  <Grid
   item
   xs={4}
   sx={{ backgroundColor: colors.white }}
   display="flex"
   flexDirection="column"
   paddingY={2}
   paddingX={4}
   marginBottom={4}
   maxHeight={350}
  >
   <Grid display={"flex"} marginBottom={2}>
    <ShoppingBasketIcon />
    <Typography paddingLeft={1}>
     You have {data.cart.totalQty} items for a total of {data.cart.totalPrice}{" "}
     EUR in your basket.
    </Typography>
   </Grid>

   <Stack direction="row" marginY={2}>
    <Typography width={200}>Delivery </Typography>
    <Typography> FREE</Typography>
   </Stack>
   <Stack direction="row">
    <Typography width={200} fontWeight={600}>
     Total
    </Typography>
    <Typography fontWeight={600}>{data.cart.totalPrice}</Typography>
   </Stack>
  </Grid>
 );
};