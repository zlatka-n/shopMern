import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { IconButton as MuiIconBtn } from "@mui/material";

export const LogInButtons = ({ onClick }: { onClick: () => void }) => {
 return (
  <Stack direction="row" alignItems="center" gap={1}>
   <Link to={"/myaccount/?"} style={{ textDecoration: "none" }}>
    <Typography color={"white"} marginLeft={1} textTransform="none">
     My account
    </Typography>
   </Link>
   <MuiIconBtn sx={{ p: 0 }} disableRipple onClick={onClick}>
    <Typography color={"white"} marginLeft={1}>
     Log out
    </Typography>
   </MuiIconBtn>
  </Stack>
 );
};
