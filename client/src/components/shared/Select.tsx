import { FormControl, MenuItem, Select as SelectMui } from "@mui/material";
import { Control, Controller } from "react-hook-form";

type Props = {
 control: Control;
 name: string;
 defaultValue?: string | number;
 data: Record<string, string | number>[];
};

export const Select = ({ control, name, defaultValue, data }: Props) => {
 return (
  <FormControl size="small" variant="standard">
   <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    render={({ field: { onChange, value } }) => (
     <SelectMui
      onChange={(e) => {
       onChange(e);
       //TODO: POST on change as props
       console.log(e);
      }}
      value={value}
     >
      {data.map(({ value, label }) => (
       <MenuItem value={value} key={value}>
        {label}
       </MenuItem>
      ))}
     </SelectMui>
    )}
   />
  </FormControl>
 );
};
