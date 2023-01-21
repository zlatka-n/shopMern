import { useEffect, useState } from "react";
import { getMyAccount } from "../api/myaccount";

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
  </div>
 );
};
