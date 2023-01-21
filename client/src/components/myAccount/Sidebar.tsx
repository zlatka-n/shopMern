import { Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { styles } from "./styles";
import { sidebarItems } from "./utils";

export const Sidebar = () => {
 return (
  <div>
   Your account
   <Stack>
    {sidebarItems.map(({ link, name }) => (
     <NavLink
      to={link}
      key={link}
      className={(navData) => (navData.isActive ? styles.active : "")}
     >
      {/* <Typography>{name}</Typography> */}
      {name}
     </NavLink>
    ))}
   </Stack>
  </div>
 );
};
