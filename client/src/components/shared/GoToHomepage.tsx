import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fontSizes } from "./styles";

type Props = {
 title?: string;
 text?: string;
};

export const GoToHomepage = ({ text, title }: Props) => {
 const navigate = useNavigate();

 const navigateToHomePage = () => navigate("/");
 return (
  <>
   <Typography fontSize={fontSizes.xLarge}>{title ? title : "Oops"}</Typography>
   <Typography>
    {text
     ? text
     : "Sorry but the page you are looking for can't be found. Please visit our homepage."}
   </Typography>
   <Button
    onClick={navigateToHomePage}
    variant="contained"
    sx={{ paddingBlock: "1rem" }}
    disableTouchRipple
   >
    Homepage
   </Button>
  </>
 );
};
