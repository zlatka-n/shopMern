import { Grid, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { postAddToCart } from "../api/cart";
import { getBooks } from "../api/shop";
import { ItemId } from "../api/types";
import { AddToBasketBtn } from "../components/shared/AddToBasketBtn";
import { colors, fontSizes } from "../components/shared/styles";
import { CheckoutModal } from "../components/cart/modal/CheckoutModal";
import { useHandleModal } from "../shared/utils";
import { useState } from "react";

export const Home = () => {
 const { open, handleClose, handleOpen } = useHandleModal();
 const [selectedBtnId, setSelectedBtnId] = useState("");

 const queryClient = useQueryClient();

 const { data: books } = useQuery("books", getBooks, {
  staleTime: 180000, //3 mins
  refetchOnMount: false,
 });

 const {
  data: newCartItems,
  mutate,
  isLoading,
 } = useMutation((item: ItemId) => postAddToCart(item), {
  onSuccess: () => {
   queryClient.invalidateQueries("cart");
   handleOpen();
  },
 });

 const onClickAddToBasket = (itemId: string) => () => {
  mutate({ itemId });
  setSelectedBtnId(itemId);
 };

 return (
  <Grid container margin={5}>
   <Grid item xs={2}>
    TODO: BAR
   </Grid>
   <Grid item xs={9}>
    <Grid container gap={4}>
     {books?.map(({ title, author, _id, price, image }) => {
      return (
       <div key={_id}>
        <Link key={_id} to={`/${_id}`} style={{ textDecoration: "none" }}>
         <img src={image} width={150} height={200} alt={title} />
         <Typography
          title={title}
          maxWidth={150}
          fontSize={fontSizes.medium}
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          marginTop={2}
          color={colors.black}
         >
          {title}
         </Typography>
         <Typography fontSize={fontSizes.small} color={colors.black}>
          {author}
         </Typography>
         <Typography fontSize={fontSizes.medium} color={colors.orange}>
          {price}
         </Typography>
        </Link>
        <AddToBasketBtn
         onClick={onClickAddToBasket(_id)}
         isLoading={selectedBtnId === _id ? isLoading : false}
        />
        <CheckoutModal
         open={open}
         onClose={handleClose}
         totalPrice={newCartItems?.cart.totalPrice}
         totalQty={newCartItems?.cart.totalQty}
        />
       </div>
      );
     })}
    </Grid>
   </Grid>
  </Grid>
 );
};
