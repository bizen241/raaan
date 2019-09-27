import { Box, NativeSelect, OutlinedInput, Typography } from "@material-ui/core";
import * as React from "react";

export const Select = React.memo<{
  label: React.ReactNode;
  defaultValue: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}>(({ label, defaultValue, onChange, children }) => (
  <Box display="flex" flexDirection="column" component="label">
    <Typography color="textSecondary">{label}</Typography>
    <NativeSelect input={<OutlinedInput labelWidth={0} />} defaultValue={defaultValue} onChange={onChange}>
      {children}
    </NativeSelect>
  </Box>
));
