import { Grid, Stack, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { getCart } from "../api/cart";
import { colors, fontSizes } from "../components/shared/styles";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { ItemCard } from "../components/cart/ItemCard";

export const Cart = () => {
 const { data } = useQuery("cart", getCart);

 return (
  <Grid sx={{ backgroundColor: colors.grey }} minHeight={"100vh"}>
   <Typography fontSize={fontSizes.medium} fontWeight={500} padding={5}>
    Your shopping cart (Items: {data?.cart.totalQty})
   </Typography>
   {data ? (
    <Grid container marginX={5} gap={2}>
     <Grid
      item
      xs={7}
      display="flex"
      flexDirection="column"
      gap={2}
      sx={{ backgroundColor: colors.white }}
      marginBottom={4}
     >
      {data.cart.items.map((product) => {
       return (
        <ItemCard
         product={product}
         onClickRemove={() => alert(`DELETE: ${product._id}`)}
        />
       );
      })}
     </Grid>
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
        You have {data.cart.totalQty} items for a total of{" "}
        {data.cart.totalPrice} EUR in your basket.
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
    </Grid>
   ) : (
    <Grid marginX={5}>You shopping cart is empty</Grid>
   )}
  </Grid>
 );
};
