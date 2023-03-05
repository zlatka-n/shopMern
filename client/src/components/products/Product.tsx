import { Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getBooksDetails } from "../../api/shop";

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
 const { ISBN10, ISBN13, dimensions, format, language, publicationDate } =
  product?.details || {};

 return (
  <div>
   <div>
    <Typography>{title}</Typography>
    <Typography>{author}</Typography>
    <Typography>{price}</Typography>
   </div>

   <div>
    <Typography>{ISBN10}</Typography>
    <Typography>{ISBN13}</Typography>
    <Typography>{dimensions}</Typography>
    <Typography>{format}</Typography>
    <Typography>{language}</Typography>
    <Typography>{publicationDate}</Typography>
   </div>
  </div>
 );
};
