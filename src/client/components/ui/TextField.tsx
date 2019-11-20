import { TextField as MuiTextField, Typography } from "@material-ui/core";
import * as React from "react";
import { useCallback } from "react";
import { Column } from "./Column";

export const TextField = React.memo<{
  label: string;
  defaultValue: string;
  onChange: (value: string) => void;
}>(({ label, defaultValue, ...props }) => {
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value), []);

  return (
    <Column pb={1}>
      <Typography color="textSecondary">{label}</Typography>
      <MuiTextField variant="outlined" defaultValue={defaultValue} onChange={onChange} />
    </Column>
  );
});
