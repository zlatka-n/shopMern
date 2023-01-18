import { TextField } from "@mui/material";
import { Control, useController } from "react-hook-form";

type Props = {
 control: Control<any>;
 name: string;
 placeholder?: string;
 type?: string;
};
export const Input = ({ control, name, placeholder, type }: Props) => {
 const {
  field: { onChange, onBlur, value },
  // fieldState,
 } = useController({
  name,
  control,
 });

 return (
  <>
   <TextField
    variant="outlined"
    onChange={onChange}
    onBlur={onBlur}
    id="outlined-basic"
    label={placeholder}
    value={value ?? ""}
    name={name}
    type={type}
   />
  </>
 );
};
