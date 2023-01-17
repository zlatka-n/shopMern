import AppBar from "@mui/material/AppBar";
import { IconButton as MuiIconBtn } from "@mui/material";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Grid, Stack } from "@mui/material";
import { topBarBtns } from "./utils";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";
import { getLogout } from "../../api/axios";
import { setLoginSuccess } from "../../redux/accountSlice";
import { IconButton } from "../shared/IconButton";

export const TopBar = () => {
 const isLoggedIn = useSelector((state: RootState) => state.account.isLoggedIn);
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const logOutUser = () => {
  getLogout().then(() => {
   console.log("User was logged out");

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
       <IconButton screen={screen} icon={icon} name={name} />
      ))}
     </Stack>
    </Grid>

    <Grid item xs={4} marginX={5}>
     <Grid container justifyContent="flex-end">
      {isLoggedIn ? (
       <Stack direction="row" alignItems="center" gap={1}>
        <Link to={"/myaccount"} style={{ textDecoration: "none" }}>
         <Typography color={"white"} marginLeft={1} textTransform="none">
          My account
         </Typography>
        </Link>
        <MuiIconBtn sx={{ p: 0 }} disableRipple onClick={logOutUser}>
         <Typography color={"white"} marginLeft={1}>
          Log out
         </Typography>
        </MuiIconBtn>
       </Stack>
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
