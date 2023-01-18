import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styles } from "../shared/styles";

type Props = {
 title?: string;
 screenName: string;
 buttonName: string;
};

export const RegisterOrLogIn = ({ title, screenName, buttonName }: Props) => {
 const navigate = useNavigate();

 const navigateToRegister = () => navigate(screenName);

 return (
  <Box className={styles.inputContainer} marginTop={5}>
   <Typography fontSize={25}>{title ? title : null}</Typography>
   <Button
    variant="contained"
    sx={{ paddingBlock: "1em" }}
    onClick={navigateToRegister}
   >
    {buttonName}
   </Button>
  </Box>
 );
};
