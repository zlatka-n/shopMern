import { Typography } from "@mui/material";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getBooks } from "../api/shop";
import { fontSizes } from "../components/shared/styles";

export const Home = () => {
 const { data: books } = useQuery("books", getBooks);

 return (
  <div>
   {books?.map(({ title, author, _id, price }) => (
    <Link key={_id} to={`/${_id}`} style={{ textDecoration: "none" }}>
     <Typography fontSize={fontSizes.medium} color={"primary"}>
      {title}
     </Typography>
     <Typography fontSize={fontSizes.medium}>{author}</Typography>
     <Typography fontSize={fontSizes.medium}>{price}</Typography>
    </Link>
   ))}
  </div>
 );
};
