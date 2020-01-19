import { IconButton, InputAdornment, TextField, Typography } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import React from "react";
import { Column } from "./Column";

export const Search = React.memo<{
  label: string;
  defaultValue: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}>(({ label, defaultValue, onChange, onSearch }) => {
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

  return (
    <Column component="label">
      <Typography color="textSecondary">{label}</Typography>
      <TextField
        variant="outlined"
        defaultValue={defaultValue}
        onChange={onInput}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={onSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </Column>
  );
});
