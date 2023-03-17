import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Address } from "./components/myAccount/address";
import { Details } from "./components/myAccount/Details";
import { Orders } from "./components/myAccount/Orders";
import { NavBar } from "./components/navBar/NavBar";
import { Product } from "./components/products/Product";
import { setLoginSuccess } from "./redux/accountSlice";
import { ForgotPassword } from "./screens/ForgotPassword";
import { Home } from "./screens/Home";
import { Login } from "./screens/Login";
import { MyAccount } from "./screens/MyAccount";
import { Register } from "./screens/Register";
import { ProtectedRoute } from "./shared/ProtectedRoute";

function App() {
 const dispatch = useDispatch();
 const isLoggedIn = document.cookie;

 if (isLoggedIn) dispatch(setLoginSuccess(true));
 if (!isLoggedIn) dispatch(setLoginSuccess(false));

 return (
  <div>
   <NavBar />
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/:id" element={<Product />} />
    <Route path="/account/login" element={<Login />} />
    <Route path="/account/register" element={<Register />} />

    <Route path="myaccount" element={<ProtectedRoute />}>
     <Route path="" element={<MyAccount />}>
      <Route path="address" element={<Address />} />
      <Route path="details" element={<Details />} />
      <Route path="orders" element={<Orders />} />
     </Route>
    </Route>

    <Route path="forgotpassword" element={<ForgotPassword />} />
   </Routes>
  </div>
 );
}

export default App;
