import { Grid, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteItemFromCart, getCart } from "../api/cart";
import { colors, fontSizes } from "../components/shared/styles";
import { ItemCard } from "../components/cart/ItemCard";
import { CartSummary } from "../components/cart/CartSummary";
import { CartWarning } from "../components/cart/CartWarning";
import { MAX_ITEM_CART_QTY } from "../shared/constants";

export const Cart = () => {
 const queryClient = useQueryClient();

 const { data } = useQuery("cart", getCart, {
  staleTime: 180000, //3 mins
  refetchOnMount: false,
 });
 const { mutate } = useMutation((id: string) => deleteItemFromCart(id), {
  onSuccess: () => queryClient.invalidateQueries("cart"),
 });

 const doesQtyExceed = data
  ? data?.cart.items.some((product) => product.qty > MAX_ITEM_CART_QTY)
  : false;

 const onClickRemove = (id: string) => () => mutate(id);
 return (
  <Grid sx={{ backgroundColor: colors.grey }} minHeight={"100vh"}>
   <Typography
    fontSize={fontSizes.medium}
    fontWeight={500}
    paddingX={5}
    paddingTop={5}
   >
    Your shopping cart (Items: {data?.cart.totalQty})
   </Typography>
   {doesQtyExceed ? <CartWarning /> : null}
   {data && data.cart.items.length > 0 ? (
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
       <ItemCard product={product} onClickRemove={onClickRemove(product._id)} />
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
