import { Box, IconButton, InputAdornment, TextField, Typography } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import * as React from "react";

export const Search = React.memo<{
  label: string;
  defaultValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}>(({ label, defaultValue, onChange, onSearch }) => (
  <Box display="flex" flexDirection="column" component="label">
    <Typography color="textSecondary">{label}</Typography>
    <TextField
      variant="outlined"
      defaultValue={defaultValue}
      onChange={onChange}
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
  </Box>
));
