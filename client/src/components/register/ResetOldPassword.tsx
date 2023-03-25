import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Input } from "../shared/Input";
import { fontSizes, styles } from "../shared/styles";
import * as yup from "yup";
import { passwordSchema } from "../../shared/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPassword } from "../../shared/types";
import { REQUIRED } from "../../shared/constants";

const resetPasswordSchema: yup.SchemaOf<ResetPassword> = yup.object().shape({
 password: passwordSchema,
 passwordConfirmation: yup
  .string()
  .oneOf([yup.ref("password")], "Your passwords do not match.")
  .required(REQUIRED),
});

export const ResetOldPassword = () => {
 const { handleSubmit, control } = useForm<ResetPassword>({
  mode: "onSubmit",
  resolver: yupResolver(resetPasswordSchema),
 });

 const onSubmit = handleSubmit(async (data) => {
  console.log(data);
 });

 return (
  <Box
   height={"90vh"}
   marginY={10}
   display="flex"
   flexDirection={"column"}
   marginTop={5}
  >
   <form onSubmit={onSubmit} className={styles.inputContainer}>
    <Typography fontSize={fontSizes.large}>Choose your new password</Typography>
    <Input
     name="password"
     control={control}
     placeholder="New password"
     type="password"
    />

    <Input
     name="passwordConfirmation"
     control={control}
     placeholder="Confirm password"
     type="password"
    />
   </form>
   <Button
    variant="contained"
    sx={{ paddingBlock: "1rem", marginTop: "2rem" }}
    onClick={onSubmit}
   >
    Reset password
   </Button>
  </Box>
 );
};
