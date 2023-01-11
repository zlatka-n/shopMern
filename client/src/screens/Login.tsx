import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Input } from "../components/shared/Input";
import { styles } from "../components/shared/styles";
export const Login = () => {
 const { handleSubmit, control } = useForm();

 const onSubmit = handleSubmit(async (data) => {
  console.log(data);
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
