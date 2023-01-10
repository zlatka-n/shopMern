import { useForm } from "react-hook-form";
import { Input } from "../components/shared/Input";

export const Login = () => {
 const {
  handleSubmit,
  // formState: { errors },
  control,
 } = useForm();
 const onSubmit = (data: any) => console.log(data);

 return (
  <form onSubmit={handleSubmit(onSubmit)}>
   <Input name="email" control={control} />
   <Input name="password" control={control} />
   <input type="submit" />
  </form>
 );
};
