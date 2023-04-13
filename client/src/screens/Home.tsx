import { Grid, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { postAddToCart } from "../api/cart";
import { getBooks } from "../api/shop";
import { ItemId } from "../api/types";
import { AddToBasketBtn } from "../components/shared/AddToBasketBtn";
import { colors, fontSizes } from "../components/shared/styles";

export const Home = () => {
 const queryClient = useQueryClient();

 const { data: books } = useQuery("books", getBooks);
 const { mutate } = useMutation((item: ItemId) => postAddToCart(item), {
  onSuccess: () => queryClient.invalidateQueries("cart"),
 });
 const onClickAddToBasket = (itemId: string) => () => {
  mutate({ itemId });
 };

 return (
  <Grid container margin={5}>
   <Grid item xs={2}>
    TODO: BAR
   </Grid>
   <Grid item xs={9}>
    <Grid container gap={4}>
     {books?.map(({ title, author, _id, price, image }) => (
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
       <AddToBasketBtn onClick={onClickAddToBasket(_id)} />
      </div>
     ))}
    </Grid>
   </Grid>
  </Grid>
 );
};
