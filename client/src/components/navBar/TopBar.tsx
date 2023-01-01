import * as React from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Grid, Stack } from "@mui/material";
import { topBarBtns } from "./utils";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

export const TopBar = () => {
 const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
  null
 );

 const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElUser(event.currentTarget);
 };

 const handleCloseUserMenu = () => {
  setAnchorElUser(null);
 };

 return (
  <AppBar position="static">
   <Grid container wrap={"nowrap"} marginY={1} alignItems="center">
    <Grid item xs={8} marginX={5}>
     <Stack direction="row" alignItems="center" gap={1}>
      {topBarBtns.map(({ icon, name }) => (
       <IconButton disableRipple>
        {icon}
        {name ? (
         <Typography color={"white"} marginLeft={1}>
          {name}
         </Typography>
        ) : null}
       </IconButton>
      ))}
     </Stack>
    </Grid>

    <Grid item xs={4} marginX={5}>
     <Grid container justifyContent="flex-end">
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
       <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
       <Typography color={"white"} marginLeft={1}>
        Sign in
       </Typography>
      </IconButton>
      <Menu
       sx={{ mt: "45px" }}
       id="menu-appbar"
       anchorEl={anchorElUser}
       anchorOrigin={{
        vertical: "top",
        horizontal: "right",
       }}
       keepMounted
       transformOrigin={{
        vertical: "top",
        horizontal: "right",
       }}
       open={Boolean(anchorElUser)}
       onClose={handleCloseUserMenu}
      >
       {settings.map((setting) => (
        <MenuItem key={setting} onClick={handleCloseUserMenu}>
         <Typography textAlign="center">{setting}</Typography>
        </MenuItem>
       ))}
      </Menu>
     </Grid>
    </Grid>
   </Grid>
  </AppBar>
 );
};
