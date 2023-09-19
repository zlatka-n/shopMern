import { TextField } from '@mui/material';
import { Control, useController } from 'react-hook-form';

type Props = {
 control: Control<any>;
 name: string;
 placeholder?: string;
 type?: string;
 [key: string]: unknown;
};

export function Input({
  control,
  name,
  placeholder,
  type,
  ...props
}: Props) {
  const {
    field: { onChange, onBlur, value },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      error={!!errors[name]?.message}
      variant="outlined"
      onChange={onChange}
      onBlur={onBlur}
      label={placeholder}
      value={value ?? ''}
      name={name}
      type={type}
      helperText={errors && errors[name]?.message?.toString()}
      {...props}
    />
  );
}
