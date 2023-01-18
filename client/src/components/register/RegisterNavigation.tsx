import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SIGN_UP } from "../../shared/constants";
import { styles } from "../shared/styles";

export const RegisterNavigation = () => {
 const navigate = useNavigate();

 const navigateToRegister = () => navigate("/account/register");

 return (
  <Box className={styles.inputContainer} marginTop={10}>
   <Typography fontSize={25}>Not registered?</Typography>
   <Button
    variant="contained"
    sx={{ paddingBlock: "1em" }}
    onClick={navigateToRegister}
   >
    {SIGN_UP}
   </Button>
  </Box>
 );
};
