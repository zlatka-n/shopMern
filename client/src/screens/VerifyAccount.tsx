import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getVerifyAccount } from "../api/auth";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { GoToHomepage } from "../components/shared/GoToHomepage";
import { styles } from "../components/shared/styles";

export const VerifyAccount = () => {
 const query = new URLSearchParams(useLocation().search);
 const token = query.get("token");
 const email = query.get("email");

 const urlParams = {
  token,
  email,
 };

 const { isLoading, isSuccess } = useQuery(
  ["getVerifyAccountId", urlParams],
  () => getVerifyAccount(urlParams)
 );

 const displayVerificationStatus = () => {
  let title, text;

  if (isSuccess) {
   title = "Success";
   text = "Your account has been verified.";
  }

  if (isLoading) {
   return (
    <Box display="flex" justifyContent="center">
     <CircularProgress />{" "}
    </Box>
   );
  }

  return (
   <div className={styles.inputContainer}>
    <GoToHomepage title={title} text={text} />
   </div>
  );
 };

 return (
  <Box
   height={"90vh"}
   marginX={10}
   display="flex"
   flexDirection={"column"}
   marginTop={5}
  >
   {displayVerificationStatus()}
  </Box>
 );
};
