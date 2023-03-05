import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import { Grid, Stack } from "@mui/material";
import { topBarBtns } from "./utils";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
 selectIsUserLoggedIn,
 setLoginSuccess,
} from "../../redux/accountSlice";
import { IconButton } from "../shared/IconButton";
import { LogInButtons } from "./LogInButtons";
import { getLogout } from "../../api/auth";

export const TopBar = () => {
 const isLoggedIn = useSelector(selectIsUserLoggedIn);
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const logOutUser = () => {
  getLogout().then(() => {
   console.log("User was logged out");

   window.sessionStorage.removeItem("userId");

   dispatch(setLoginSuccess(false));
   navigate("account/login");

   return;
  });
 };

 return (
  <AppBar position="static">
   <Grid container wrap={"nowrap"} marginY={1} alignItems="center">
    <Grid item xs={8} marginX={5}>
     <Stack direction="row" alignItems="center" gap={1}>
      {topBarBtns.map(({ icon, name, screen }) => (
       <div key={screen}>
        <IconButton screen={screen} icon={icon} name={name} />
       </div>
      ))}
     </Stack>
    </Grid>

    <Grid item xs={4} marginX={5}>
     <Grid container justifyContent="flex-end">
      {isLoggedIn ? (
       <LogInButtons onClick={logOutUser} />
      ) : (
       <IconButton
        screen="/account/login"
        name="Sign in"
        icon={<Avatar alt="avatar" />}
       />
      )}
     </Grid>
    </Grid>
   </Grid>
  </AppBar>
 );
};
