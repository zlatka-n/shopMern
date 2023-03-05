import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Input } from "../components/shared/Input";
import { styles } from "../components/shared/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoginSuccess } from "../redux/accountSlice";
import { object, string, SchemaOf } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { REQUIRED, SIGN_IN, SIGN_UP, WRONG_EMAIL } from "../shared/constants";
import { RegisterOrLogIn } from "../components/register/RegisterOrLogin";
import { Login as LoginValues } from "../shared/types";
import { postLogin } from "../api/auth";

const loginSchema: SchemaOf<LoginValues> = object().shape({
 email: string().email(WRONG_EMAIL).required(REQUIRED),
 password: string().required(REQUIRED),
});

export const Login = () => {
 const { handleSubmit, control } = useForm<LoginValues>({
  resolver: yupResolver(loginSchema),
 });

 const navigate = useNavigate();
 const dispatch = useDispatch();

 const onSubmit = handleSubmit(async (data) => {
  postLogin({ email: data.email, password: data.password }).then(() => {
   dispatch(setLoginSuccess(true));

   navigate("/");
  });
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
    <Typography fontSize={25}>Welcome back</Typography>
    <Input name="email" control={control} placeholder="Email" />
    <Input
     name="password"
     control={control}
     placeholder="Password"
     type="password"
    />
    <Button onClick={onSubmit} variant="contained" sx={{ paddingBlock: "1em" }}>
     {SIGN_IN}
    </Button>
   </form>
   <RegisterOrLogIn
    screenName="/account/register"
    buttonName={SIGN_UP}
    title="Not registered?"
   />
  </Box>
 );
};
