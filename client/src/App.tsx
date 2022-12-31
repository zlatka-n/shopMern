// import axios from "axios";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navBar/NavBar";
import { Home } from "./screens/Home";

function App() {
 //  axios({
 //   method: "get",
 //   url: "http://localhost:4000/",
 //  }).then(function (response) {
 //   console.log(response);
 //  });

 return (
  <div>
   <NavBar />
   <Routes>
    <Route path="/" element={<Home />} />
   </Routes>
  </div>
 );
}

export default App;
