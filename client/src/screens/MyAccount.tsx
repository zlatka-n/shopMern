import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getMyAccount } from "../api/myaccount";
import { Sidebar } from "../components/myAccount/Sidebar";
import { OverviewHeader } from "./OverviewHeader";

export const MyAccount = () => {
 const [firstName, setFirstName] = useState<string>("");

 const { pathname } = useLocation();

 useEffect(() => {
  getMyAccount().then((res) => setFirstName(res.firstName));
 }, []);

 return (
  <Grid container marginX={10} marginY={5} maxWidth="90vw">
   <Grid item xs={2} marginTop={1}>
    <Sidebar />
   </Grid>
   <Grid item xs={10}>
    {pathname === "/myaccount/" ? (
     <OverviewHeader
      heading={`Hello ${firstName},`}
      text={
       "Welcome to your account. Here you can control orders, returns or edit personal information."
      }
     />
    ) : null}
    <Outlet />
   </Grid>
  </Grid>
 );
};
