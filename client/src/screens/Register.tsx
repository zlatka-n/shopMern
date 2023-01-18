import { useForm } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import { Input } from "../components/shared/Input";
import { styles } from "../components/shared/styles";
import { SIGN_UP, SIGN_IN } from "../shared/constants";
import { RegisterOrLogIn } from "../components/register/RegisterOrLogin";

export const Register = () => {
 const {
  handleSubmit,
  formState: { errors },
  control,
 } = useForm<any>({
  // resolver: yupResolver(loginSchema),
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
