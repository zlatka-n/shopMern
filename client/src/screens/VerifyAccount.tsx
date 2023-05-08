import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getVerifyAccount } from "../api/auth";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { NotFound } from "../components/shared/NotFound";
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
  if (!email) {
   return (
    <div className={styles.inputContainer}>
     <NotFound />
    </div>
   );
  }

  if (isLoading) {
   return (
    <Box display="flex" justifyContent="center">
     <CircularProgress />{" "}
    </Box>
   );
  }

  if (isSuccess) {
   return (
    <div className={styles.inputContainer}>Your account was verified</div>
   );
  }

  return (
   <div className={styles.inputContainer}>
    Your account could not be verified
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
