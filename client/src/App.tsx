import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navBar/NavBar";
import { setLoginSuccess } from "./redux/accountSlice";
import { Home } from "./screens/Home";
import { Login } from "./screens/Login";

function App() {
 const dispatch = useDispatch();

 const isLoggedIn = localStorage.getItem("isLoggedIn");
 if (isLoggedIn) dispatch(setLoginSuccess(true));

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
