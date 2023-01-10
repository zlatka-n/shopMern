import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { Input } from "../components/shared/Input";
import { styles } from "../components/shared/styles";
export const Login = () => {
 const {
  handleSubmit,
  // formState: { errors },
  control,
 } = useForm();
 const onSubmit = (data: any) => console.log(data);

 return (
  <Box
   height={"90vh"}
   marginX={10}
   display="flex"
   flexDirection={"column"}
   marginTop={2}
  >
   <form onSubmit={handleSubmit(onSubmit)} className={styles.inputContainer}>
    <Input name="email" control={control} />
    <Input name="password" control={control} />
    <input type="submit" />
   </form>
  </Box>
 );
};
