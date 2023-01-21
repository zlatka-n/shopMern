import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getMyAccount } from "../api/myaccount";
import { Sidebar } from "../components/myAccount/Sidebar";
import { OverviewHeader } from "./OverviewHeader";

export const MyAccount = () => {
 const [firstName, setFirstName] = useState<string>("");

 useEffect(() => {
  getMyAccount().then((res) => setFirstName(res.firstName));
 }, []);

 return (
  <Grid container marginX={10} marginY={5}>
   <Grid item xs={2} marginTop={1}>
    <Sidebar />
   </Grid>
   <Grid item xs={10}>
    <OverviewHeader name={firstName} />
    <Outlet />
   </Grid>
  </Grid>
 );
};
