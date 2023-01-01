// import axios from "axios";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navBar/NavBar";
import { Home } from "./screens/Home";

function App() {
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
