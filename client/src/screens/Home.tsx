import { Grid, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getBooks } from "../api/shop";
import { AddToBasketBtn } from "../components/shared/AddToBasketBtn";
import { colors, fontSizes } from "../components/shared/styles";

export const Home = () => {
 const { data: books } = useQuery("books", getBooks);

 return (
  <Grid container margin={5}>
   <Grid item xs={2}>
    TODO: BAR
   </Grid>
   <Grid item xs={9}>
    <Grid container gap={4}>
     {books?.map(({ title, author, _id, price, image }) => (
      <div>
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
       <AddToBasketBtn onClick={() => alert("POST: add to basket")} />
      </div>
     ))}
    </Grid>
   </Grid>
  </Grid>
 );
};
