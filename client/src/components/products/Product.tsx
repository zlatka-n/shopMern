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
      <Grid item xs={6}>
       <Typography key={product?.details[key]}>
        {[key]}: {product?.details[key]}
       </Typography>
      </Grid>
     ))
   : null;
 }, [product?.details]);

 return (
  <Grid
   container
   marginX={{ md: 20, xs: 2 }}
   marginY={5}
   flexDirection="row"
   //  justifyContent={flex-start}
   gap={5}
  >
   <Grid item xs={12} md={3}>
    <img src={product?.basicInfo.image} alt={title} />
   </Grid>
   <Grid item md={5.5} xs={11}>
    <Typography fontSize={fontSizes.large}>{title}</Typography>
    <Typography lineHeight={3}>{`By (author) ${author}`}</Typography>
    <Typography lineHeight={2}>
     Price <span style={{ fontSize: fontSizes.medium }}>{price}</span>
    </Typography>
    <Typography>{product?.description}</Typography>
    <Button variant="contained" sx={{ marginY: 4 }}>
     Add to basket
    </Button>
    <Typography lineHeight={2}>Details</Typography>
    <Grid container>{showDetails}</Grid>
   </Grid>
  </Grid>
 );
};
