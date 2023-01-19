import { useForm } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import { Input } from "../components/shared/Input";
import { styles } from "../components/shared/styles";
import { SIGN_UP, SIGN_IN, WRONG_EMAIL, REQUIRED } from "../shared/constants";
import { RegisterOrLogIn } from "../components/register/RegisterOrLogin";
import * as yup from "yup";
import YupPassword from "yup-password";
import { SignUp } from "../shared/types";
import { yupResolver } from "@hookform/resolvers/yup";

YupPassword(yup);

const signUpSchema: yup.SchemaOf<SignUp> = yup.object().shape({
 email: yup.string().email(WRONG_EMAIL).required(REQUIRED),
 password: yup
  .string()
  .min(6, "Password must have at least 6 characters")
  .max(20, "Password must have 20 charactesr at most")
  .minUppercase(1, "Password must include uppercase")
  .minNumbers(1, "Password must include number")
  .required(REQUIRED),
 firstName: yup.string().required(REQUIRED),
 lastName: yup.string().required(REQUIRED),
});

export const Register = () => {
 const { handleSubmit, control } = useForm<SignUp>({
  mode: "onSubmit",
  resolver: yupResolver(signUpSchema),
 });

 const onSubmit = handleSubmit(async (data) => {
  console.log(data);
  //TODO: POST: /register
 });

 return (
  <Box
   height={"90vh"}
   marginX={10}
   display="flex"
   flexDirection={"column"}
   marginTop={5}
  >
   <form onSubmit={onSubmit} className={styles.inputContainer}>
    <Typography fontSize={25}>Register</Typography>
    <Input name="firstName" control={control} placeholder="First name" />
    <Input name="lastName" control={control} placeholder="Last name" />
    <Input name="email" control={control} placeholder="Email" />
    <Input
     name="password"
     control={control}
     placeholder="Password"
     type="password"
    />
    <Button onClick={onSubmit} variant="contained" sx={{ paddingBlock: "1em" }}>
     {SIGN_UP}
    </Button>
   </form>
   <RegisterOrLogIn
    screenName="/account/login"
    buttonName={SIGN_IN}
    title="Already registered?"
   />
  </Box>
 );
};
