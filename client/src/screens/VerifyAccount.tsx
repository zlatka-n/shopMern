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
  if (!email) {
   return (
    <div className={styles.inputContainer}>
     <GoToHomepage />
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
    <div className={styles.inputContainer}>
     <GoToHomepage title="Success" text="Your account has been verified." />
    </div>
   );
  }

  return (
   <div className={styles.inputContainer}>
    <GoToHomepage text="Your account could not be verified. Please, retry again." />
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
