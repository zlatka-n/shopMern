import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fontSizes } from "./styles";

export const NotFound = () => {
 const navigate = useNavigate();

 const navigateToHomePage = () => navigate("/");
 return (
  <>
   <Typography fontSize={fontSizes.xLarge}>Oops</Typography>
   <Typography>
    Sorry but the page you are looking for can't be found. Please visit our
    homepage.
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
