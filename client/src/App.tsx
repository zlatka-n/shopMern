import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Address } from './components/myAccount/address';
import { Details } from './components/myAccount/Details';
import { Orders } from './components/myAccount/Orders';
import { NavBar } from './components/navBar/NavBar';
import { Product } from './components/products/Product';
import { setLoginSuccess } from './redux/accountSlice';
import { Cart } from './screens/Cart';
import { ForgotPassword } from './screens/ForgotPassword';
import { Home } from './screens/Home';
import { Login } from './screens/Login';
import { MyAccount } from './screens/MyAccount';
import { Register } from './screens/Register';
import { ResetPassword } from './screens/ResetPassword';
import { ResetPasswordInstruction } from './screens/ResetPasswordInstruction';
import { ProtectedRoute } from './shared/ProtectedRoute';
import { VerifyAccount } from './screens/VerifyAccount';
import SuccessPayment from './screens/SuccessPayment';
import { Checkout } from './screens/Checkout';
import { STRIPE_LOAD_KEY } from './config';

const stripePromise = loadStripe(STRIPE_LOAD_KEY);

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = document.cookie;

  if (isLoggedIn) dispatch(setLoginSuccess(true));
  if (!isLoggedIn) dispatch(setLoginSuccess(false));

  return (
    <div>
      <Elements stripe={stripePromise}>
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

          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/forgotpassword/instructions"
            element={<ResetPasswordInstruction />}
          />
          <Route path="/passwordReset" element={<ResetPassword />} />
          <Route path="/verifyAccount" element={<VerifyAccount />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-form" element={<Checkout />} />
          <Route path="/success-payment/order" element={<SuccessPayment />} />
        </Routes>
      </Elements>
    </div>
  );
}

export default App;
