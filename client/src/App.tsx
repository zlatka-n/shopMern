import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navBar/NavBar";
import { setLoginSuccess } from "./redux/accountSlice";
import { Home } from "./screens/Home";
import { Login } from "./screens/Login";
import { MyAccount } from "./screens/MyAccount";
import { Register } from "./screens/Register";

function App() {
 const dispatch = useDispatch();

 const isLoggedIn = document.cookie;
 if (isLoggedIn) dispatch(setLoginSuccess(true));

 return (
  <div>
   <NavBar />
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/account/login" element={<Login />} />
    <Route path="/account/register" element={<Register />} />

    <Route path="/myaccount" element={<MyAccount />} />
   </Routes>
  </div>
 );
}

export default App;
