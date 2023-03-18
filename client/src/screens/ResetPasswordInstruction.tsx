import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { ResetInstructions } from "../components/register/ResetInstructions";
import { NotFound } from "../components/shared/NotFound";
import { styles } from "../components/shared/styles";

export const ResetPasswordInstruction = () => {
 const { state } = useLocation();
 const { email } = state ?? {};
 return (
  <Box
   height={"90vh"}
   marginX={10}
   display="flex"
   flexDirection={"column"}
   marginTop={5}
  >
   <div className={styles.inputContainer}>
    {email ? <ResetInstructions email={email} /> : <NotFound />}
   </div>
  </Box>
 );
};
