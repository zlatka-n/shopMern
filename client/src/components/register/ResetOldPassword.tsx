import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Input } from "../shared/Input";
import { fontSizes, styles } from "../shared/styles";
import { RegisterOrLogIn } from "./RegisterOrLogin";

export const ResetOldPassword = () => {
 const { handleSubmit, control } = useForm<any>({
  mode: "onSubmit",
 });

 return (
  <Box
   height={"90vh"}
   marginY={10}
   display="flex"
   flexDirection={"column"}
   marginTop={5}
  >
   <form
    onSubmit={() => alert("reset password")}
    className={styles.inputContainer}
   >
    <Typography fontSize={fontSizes.large}>Choose your new password</Typography>
    <Input
     name="password"
     control={control}
     placeholder="New password"
     type="password"
    />

    <Input
     name="passwordAgain"
     control={control}
     placeholder="Confirm password"
     type="password"
    />
   </form>
   <RegisterOrLogIn screenName="/account/login" buttonName={"Reset"} />
  </Box>
 );
};
