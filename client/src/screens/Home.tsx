import { useQuery } from "react-query";
import { getBooks } from "../api/axios";

export const Home = () => {
 const { data: books } = useQuery("books", getBooks);

 return (
  <div>
   {books?.map(({ title, author, description, _id }) => (
    <div key={_id}>
     <p>{title}</p>
     <p>{author}</p>
     <p>{description}</p>
    </div>
   ))}
  </div>
 );
};
