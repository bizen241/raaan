import { TextField as MuiTextField, Typography } from "@material-ui/core";
import * as React from "react";
import { useCallback } from "react";
import { Column } from "./Column";

export const TextField = React.memo<{
  label: string;
  defaultValue: string;
  multiline?: boolean;
  onChange: (value: string) => void;
}>(({ label, defaultValue, multiline, onChange }) => {
  const onInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value), []);

  return (
    <Column pb={1}>
      <Typography color="textSecondary">{label}</Typography>
      <MuiTextField variant="outlined" multiline={multiline} defaultValue={defaultValue} onChange={onInput} />
    </Column>
  );
});
