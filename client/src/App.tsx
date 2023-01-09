import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navBar/NavBar";
import { Home } from "./screens/Home";
import { Login } from "./screens/Login";

function App() {
 return (
  <div>
   <NavBar />
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/account/login" element={<Login />} />
   </Routes>
  </div>
 );
}

export default App;
