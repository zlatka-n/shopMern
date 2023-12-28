import { useState } from 'react';
import { useQuery } from 'react-query';
import { createSearchParams, useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const handleQueryParams = (newValue: string | null) => {
    if (newValue) {
      navigate({
        pathname: 'search',
        search: createSearchParams({
          q: newValue,
        }).toString(),
      });
    }
  };
  const handleKeyPress: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Enter') {
      handleQueryParams(keyword);
    }
  };

  return (
    <Autocomplete
      freeSolo
      fullWidth
      open={open}
      onOpen={() => {
        !!data && setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option === value}
      getOptionLabel={(option) => option}
      options={data ?? []}
      renderInput={(params) => (
        <TextField
          {...params}
          onKeyDown={(e) => handleKeyPress(e)}
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
      onInputChange={(e) => setKeyword((e.target as HTMLInputElement).value)}
      onChange={(_, newValue) => handleQueryParams(newValue)}
    />
  );
}
