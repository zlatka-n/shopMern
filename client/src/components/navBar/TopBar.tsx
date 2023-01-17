import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Grid, Stack } from "@mui/material";
import { topBarBtns } from "./utils";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";
import { getLogout } from "../../api/axios";
import { setLoginSuccess } from "../../redux/accountSlice";

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
       <Link to={`${screen}`} key={screen}>
        <IconButton disableRipple>
         {icon}
         {name ? (
          <Typography color={"white"} marginLeft={1}>
           {name}
          </Typography>
         ) : null}
        </IconButton>
       </Link>
      ))}
     </Stack>
    </Grid>

    <Grid item xs={4} marginX={5}>
     <Grid container justifyContent="flex-end">
      {isLoggedIn ? (
       <IconButton sx={{ p: 0 }} disableRipple onClick={logOutUser}>
        <Avatar alt="avatar" />
        <Typography color={"white"} marginLeft={1}>
         Log out
        </Typography>
       </IconButton>
      ) : (
       <Link to={"/account/login"} style={{ textDecoration: "none" }}>
        <IconButton sx={{ p: 0 }} disableRipple>
         <Avatar alt="avatar" />
         <Typography color={"white"} marginLeft={1}>
          Sign in
         </Typography>
        </IconButton>
       </Link>
      )}
     </Grid>
    </Grid>
   </Grid>
  </AppBar>
 );
};
