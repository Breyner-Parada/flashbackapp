import React from 'react';
import { Autocomplete, TextField, Chip } from '@mui/material';

export const ChipInput = ({id, options, defaultValue, onChange}) => {
  return (
    <Autocomplete
        multiple
        id={id}
        options={options}
        defaultValue={defaultValue}
        freeSolo
        onChange={onChange}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            sx={{margin: '10px 0'}}
            {...params}
            variant="outlined"
            label="Search Tags"
            placeholder='Press Enter then Search'
          />
        )}
      />
  )
}
