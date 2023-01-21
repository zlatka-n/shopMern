import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { getMyAccount } from "../api/myaccount";
import { Sidebar } from "../components/myAccount/Sidebar";

export const MyAccount = () => {
 const [firstName, setFirstName] = useState<string>("");

 useEffect(() => {
  getMyAccount().then((res) => setFirstName(res.firstName));
 }, []);

 return (
  <div>
   <h1>Hello {firstName},</h1>
   <p>
    Welcome to your account. Here you can control orders, returns or edit
    personal information.
   </p>
   <Sidebar />
   <Outlet />
  </div>
 );
};
