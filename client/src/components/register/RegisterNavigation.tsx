import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styles } from "../shared/styles";

export const RegisterNavigation = () => {
 const navigate = useNavigate();

 return (
  <Box className={styles.inputContainer} marginTop={10}>
   <Typography fontSize={25}>Not registered?</Typography>
   <Button
    variant="contained"
    sx={{ paddingBlock: "1em" }}
    onClick={() => navigate("/account/register")}
   >
    Sign up
   </Button>
  </Box>
 );
};
