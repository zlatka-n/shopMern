import React from 'react';
import { FormControl, MenuItem, Select as SelectMui } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

type Props = {
 control: Control;
 name: string;
 defaultValue?: string | number;
 data: Record<string, string | number>[];
 onChangeSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function Select({
  control,
  name,
  defaultValue,
  data,
  onChangeSelect,
}: Props) {
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
              onChangeSelect && onChangeSelect(e.target.value);
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
}
