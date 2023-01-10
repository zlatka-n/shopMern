import { TextField } from "@mui/material";
import { Control, useController, useForm } from "react-hook-form";

type Props = {
 control: Control<any>;
 name: string;
};
export const Input = ({ control, name }: Props) => {
 const {
  field: { onChange, onBlur, value, ref },
  // fieldState,
 } = useController({
  name,
  control,
 });

 return (
  <TextField
   onChange={onChange}
   onBlur={onBlur}
   value={value}
   name={name}
   inputRef={ref}
  />
 );
};
