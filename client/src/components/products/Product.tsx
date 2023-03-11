import { Button, Grid, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getBooksDetails } from "../../api/shop";
import { fontSizes } from "../shared/styles";
import { Description } from "./Description";
import { Details } from "./Details";

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
    <Typography fontSize={fontSizes.large}>{title}</Typography>
    <Typography lineHeight={3}>{`By (author) ${author}`}</Typography>
    <Typography lineHeight={2}>
     Price <span style={{ fontSize: fontSizes.medium }}>{price}</span>
    </Typography>
    <Description description={product?.description ?? ""} />
    <Button variant="contained" sx={{ marginY: 4 }}>
     Add to basket
    </Button>
    <Details details={product?.details} />
   </Grid>
  </Grid>
 );
};
