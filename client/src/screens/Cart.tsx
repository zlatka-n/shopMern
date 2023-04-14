import { Grid, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { getCart } from "../api/cart";
import { colors, fontSizes } from "../components/shared/styles";
import { ItemCard } from "../components/cart/ItemCard";
import { CartSummary } from "../components/cart/CartSummary";

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
      {data.cart.items.map((product) => (
       <ItemCard
        product={product}
        onClickRemove={() => alert(`DELETE: ${product._id}`)}
       />
      ))}
     </Grid>
     <CartSummary data={data} />
    </Grid>
   ) : (
    <Grid marginX={5}>You shopping cart is empty</Grid>
   )}
  </Grid>
 );
};
