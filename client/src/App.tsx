import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Address } from "./components/myAccount/address/Address";
import { Details } from "./components/myAccount/Details";
import { Orders } from "./components/myAccount/Orders";
import { NavBar } from "./components/navBar/NavBar";
import { selectIsUserLoggedIn, setLoginSuccess } from "./redux/accountSlice";
import { Home } from "./screens/Home";
import { Login } from "./screens/Login";
import { MyAccount } from "./screens/MyAccount";
import { Register } from "./screens/Register";

function App() {
 const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

 const dispatch = useDispatch();

 const isLoggedIn = document.cookie;

 if (isLoggedIn) dispatch(setLoginSuccess(true));
 if (!isLoggedIn) dispatch(setLoginSuccess(false));

 return (
  <div>
   <NavBar />
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/account/login" element={<Login />} />
    <Route path="/account/register" element={<Register />} />

    {isUserLoggedIn ? (
     <Route path="myaccount" element={<MyAccount />}>
      <Route path="address" element={<Address />} />
      <Route path="details" element={<Details />} />
      <Route path="orders" element={<Orders />} />
     </Route>
    ) : null}
   </Routes>
  </div>
 );
}

export default App;
