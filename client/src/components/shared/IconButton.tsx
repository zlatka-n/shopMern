import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { IconButton as MuiIconBtn } from "@mui/material";

type Props = {
 screen: string;
 icon: React.ReactNode;
 name?: string;
};

export const IconButton = ({ screen, icon, name }: Props) => {
 return (
  <Link to={`${screen}`} style={{ textDecoration: "none" }}>
   <MuiIconBtn disableRipple>
    {icon}
    {name ? (
     <Typography color={"white"} marginLeft={1}>
      {name}
     </Typography>
    ) : null}
   </MuiIconBtn>
  </Link>
 );
};
