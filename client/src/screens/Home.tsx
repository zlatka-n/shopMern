import axios from "axios";
import { useEffect, useState } from "react";

export const Home = () => {
 const [books, setBooks] = useState([]);

 useEffect(() => {
  axios({
   method: "get",
   url: "http://localhost:4000/",
  })
   .then(function (response) {
    const { data } = response;
    console.log(data);
    setBooks(data);
   })
   .catch((err) => console.error(err));
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
