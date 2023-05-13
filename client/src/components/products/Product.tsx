import { Grid, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { getBooksDetails } from "../../api/shop";
import { AddToBasketBtn } from "../shared/AddToBasketBtn";
import { fontSizes } from "../shared/styles";
import { Description } from "./Description";
import { Details } from "./Details";
import { postAddToCart } from "../../api/cart";
import { ItemId } from "../../api/types";
import { useHandleBtnId, useHandleModal } from "../../shared/utils";
import { CheckoutModal } from "../cart/modal/CheckoutModal";

export const Product = () => {
 const { id } = useParams();

 const { selectedBtnId, handleSelectedBtnId } = useHandleBtnId();
 const { open, handleClose, handleOpen } = useHandleModal();

 const queryClient = useQueryClient();

 const { data: product } = useQuery(
  "productDetails",
  () => getBooksDetails(id),
  {
   enabled: !!id,
  }
 );

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

 const { author, price, title } = product?.basicInfo || {};

 const onClickAddToBasket = (itemId: string) => () => {
  mutate({ itemId });
  handleSelectedBtnId(itemId);
 };

 return (
  <Grid
   container
   marginX={{ md: 20, xs: 2 }}
   marginY={5}
   flexDirection="row"
   gap={5}
  >
   <Grid item xs={12} md={3}>
    <img src={product?.basicInfo.image} alt={title} />
   </Grid>
   <Grid item md={5.5} xs={11}>
    <Typography fontSize={fontSizes.xLarge}>{title}</Typography>
    <Typography lineHeight={3}>{`By (author) ${author}`}</Typography>
    <Typography lineHeight={2}>
     Price <span style={{ fontSize: fontSizes.medium }}>{price}</span>
    </Typography>
    <Description description={product?.description ?? ""} />
    <AddToBasketBtn
     onClick={onClickAddToBasket(id as string)}
     isLoading={selectedBtnId === id ? isLoading : false}
    />
    <Details details={product?.details} />
   </Grid>
   <CheckoutModal
    open={open}
    onClose={handleClose}
    totalPrice={newCartItems?.cart.totalPrice}
    totalQty={newCartItems?.cart.totalQty}
    opacity="1"
   />
  </Grid>
 );
};
