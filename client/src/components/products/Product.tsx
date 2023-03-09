import { Typography } from "@mui/material";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getBooksDetails } from "../../api/shop";
import { Details } from "../../api/types";
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
  <div>
   <div>
    <Typography fontSize={fontSizes.large}>{title}</Typography>
    <Typography
     fontSize={fontSizes.medium}
    >{`By (author) ${author}`}</Typography>
    <Typography>{product?.description}</Typography>
    <Typography fontSize={fontSizes.medium}>{price}</Typography>
   </div>
   <Typography fontSize={fontSizes.medium}>Details</Typography>
   <div>{showDetails}</div>
  </div>
 );
};
