import { Grid, IconButton, Stack, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { getCart } from "../api/cart";
import { colors, fontSizes } from "../components/shared/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

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
       const totalProductPrice = product.qty * product.price;
       return (
        <Grid
         key={product._id}
         display="flex"
         paddingX={2}
         paddingBottom={4}
         sx={{
          borderBottom: `2px solid ${colors.grey}`,
          "&:last-child": { borderBottom: "0px" },
          "&:first-of-type": { paddingTop: 2 },
         }}
        >
         <img src={product.image} width={150} height={200} />
         <Grid item marginLeft={3} xs={7}>
          <Typography fontSize={fontSizes.medium}>{product.title}</Typography>
          <Typography fontSize={fontSizes.small}>{product.author}</Typography>
          <Typography fontSize={fontSizes.medium} color={colors.orange}>
           {product.price} EUR
          </Typography>
         </Grid>
         <Grid>
          <Typography>Quantity: {product.qty}</Typography>
          <Typography fontSize={fontSizes.medium} color={colors.orange}>
           {totalProductPrice} EUR
          </Typography>

          <IconButton
           disableRipple
           edge="start"
           sx={{ paddingTop: 0 }}
           onClick={() => alert("TODO: remove item")}
          >
           <DeleteIcon />
           <Typography>Remove</Typography>
          </IconButton>
         </Grid>
        </Grid>
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
