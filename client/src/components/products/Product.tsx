import { Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getBooksDetails } from "../../api/shop";
import { Details } from "../../api/types";

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
  <div>
   <div>
    <Typography>{title}</Typography>
    <Typography>{author}</Typography>
    <Typography>{price}</Typography>
   </div>
   {product?.details
    ? Object.keys(product?.details).map((key) => (
       <Typography key={product?.details[key]}>
        {product?.details[key]}
       </Typography>
      ))
    : null}
  </div>
 );
};
