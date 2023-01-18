import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { postLogin } from "../api/axios";
import { Input } from "../components/shared/Input";
import { styles } from "../components/shared/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoginSuccess } from "../redux/accountSlice";
import { object, string, SchemaOf } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type LoginValues = {
 email: string;
 password: string;
};

const loginSchema: SchemaOf<LoginValues> = object().shape({
 email: string().email("Wrong email format").required("Required"),
 password: string().required("Required"),
});

export const Login = () => {
 const {
  handleSubmit,
  formState: { errors },
  control,
 } = useForm<LoginValues>({
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
  <Box height={"90vh"} marginX={10} display="flex" marginTop={15}>
   <form onSubmit={onSubmit} className={styles.inputContainer}>
    <Input name="email" control={control} placeholder="Email" />
    {errors.email && <p>{errors.email.message}</p>}
    <Input
     name="password"
     control={control}
     placeholder="Password"
     type="password"
    />
    <Button onClick={onSubmit} variant="contained">
     Submit
    </Button>
   </form>
  </Box>
 );
};
