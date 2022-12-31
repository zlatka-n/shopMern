import axios from "axios";
import { useState } from "react";

function App() {
 const [count, setCount] = useState(0);

 axios({
  method: "get",
  url: "http://localhost:4000/",
 }).then(function (response) {
  console.log(response);
 });

 return <div>Hello World!</div>;
}

export default App;
