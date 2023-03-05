import { useQuery } from "react-query";
import { getBooks } from "../api/axios";

export const Home = () => {
 const { data: books } = useQuery("books", getBooks);

 return (
  <div>
   {books?.map(({ title, author, _id, price }) => (
    <div key={_id}>
     <p>{title}</p>
     <p>{author}</p>
     <p>{price}</p>
    </div>
   ))}
  </div>
 );
};
