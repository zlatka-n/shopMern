import { Button, Grid, Paper, Typography } from "@mui/material";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getBooksDetails } from "../../api/shop";
import { fontSizes } from "../shared/styles";

export const Product = () => {
 const { id } = useParams();

 const { data: product } = useQuery(
  "productDetails",
  () => getBooksDetails(id),
  {
   enabled: !!id,
  }
 );

 const { author, price, title } = product?.basicInfo || {};
 const showDetails = useMemo(() => {
  return product?.details
   ? Object.keys(product?.details).map((key) => (
      <Typography key={product?.details[key]}>
       {product?.details[key]}
      </Typography>
     ))
   : null;
 }, [product?.details]);

 return (
  <Grid container marginX={2}>
   <Grid container marginTop={5} marginBottom={3}>
    <Grid
     item
     xs={12}
     md={3}
     display="flex"
     justifyContent="center"
     alignItems="center"
    >
     <img src={product?.basicInfo.image} alt={title} />
    </Grid>
    <Grid item md={5} xs={12} paddingRight={7}>
     <Typography fontSize={fontSizes.large}>{title}</Typography>
     <Typography
      fontSize={fontSizes.medium}
     >{`By (author) ${author}`}</Typography>
     <Typography>{product?.description}</Typography>
    </Grid>
    <Grid item md={4} xs={12} paddingX={4}>
     <Typography fontSize={fontSizes.large} lineHeight={2}>
      {price}
     </Typography>
     <Typography lineHeight={2}>Free Delivery</Typography>
     <Typography lineHeight={2}>
      Price includes VAT/import taxes for EU delivery
     </Typography>
     <Typography lineHeight={2}>
      Available. Expected delivery to the Czech Republic in 12-17 business days.
     </Typography>
     <Button variant="contained" fullWidth={true} sx={{ marginTop: 2 }}>
      Add to basket
     </Button>
    </Grid>
   </Grid>

   <Grid item xs={12} md={3}>
    <Typography fontSize={fontSizes.medium}>Details</Typography>
    <div>{showDetails}</div>
   </Grid>
  </Grid>
 );
};
