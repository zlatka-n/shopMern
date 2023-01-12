import { useEffect, useState } from "react";
import { getBooks } from "../api/axios";

export const Home = () => {
 const [books, setBooks] = useState([]);

 useEffect(() => {
  getBooks().then((data) => setBooks(data));
 }, []);

 return (
  <div>
   {books.map(({ title, author, description, _id }) => (
    <div key={_id}>
     <p>{title}</p>
     <p>{author}</p>
     <p>{description}</p>
    </div>
   ))}
  </div>
 );
};
