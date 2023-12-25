import { useState } from 'react';
import { useQuery } from 'react-query';
import { Autocomplete, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getSuggestions } from '../../api/search';

export function Searchbar() {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const { data } = useQuery(
    ['searchResults', keyword],
    () => getSuggestions(keyword),
    {
      enabled: keyword !== '',
    }
  );

  return (
    <Autocomplete
      fullWidth
      open={open}
      onOpen={() => {
        !!data && setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={data ?? []}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: <SearchIcon />,
          }}
          sx={{
            backgroundColor: 'white',
            borderRadius: '5px',
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'transparent',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent',
              },
            },
          }}
        />
      )}
      onInputChange={(e) => setKeyword(e.target.value)}
    />
  );
}
