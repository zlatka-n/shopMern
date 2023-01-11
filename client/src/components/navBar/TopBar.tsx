import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Grid, Stack } from "@mui/material";
import { topBarBtns } from "./utils";
import { Link } from "react-router-dom";

export const TopBar = () => {
 return (
  <AppBar position="static">
   <Grid container wrap={"nowrap"} marginY={1} alignItems="center">
    <Grid item xs={8} marginX={5}>
     <Stack direction="row" alignItems="center" gap={1}>
      {topBarBtns.map(({ icon, name, screen }) => (
       <Link to={`${screen}`}>
        <IconButton disableRipple key={screen}>
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
      <Link to={"/account/login"} style={{ textDecoration: "none" }}>
       <IconButton sx={{ p: 0 }} disableRipple>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        <Typography color={"white"} marginLeft={1}>
         Sign in
        </Typography>
       </IconButton>
      </Link>
     </Grid>
    </Grid>
   </Grid>
  </AppBar>
 );
};
