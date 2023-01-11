import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { postLogin } from "../api/axios";
import { Input } from "../components/shared/Input";
import { styles } from "../components/shared/styles";
import { useNavigate } from "react-router-dom";

export const Login = () => {
 const { handleSubmit, control } = useForm();
 const navigate = useNavigate();

 const onSubmit = handleSubmit(async (data) => {
  postLogin({ email: data.email, password: data.password });
  navigate("/");
 });

 return (
  <Box height={"90vh"} marginX={10} display="flex" marginTop={15}>
   <form onSubmit={onSubmit} className={styles.inputContainer}>
    <Input name="email" control={control} placeholder="Email" />
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
