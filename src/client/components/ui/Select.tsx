import { FormControl, InputLabel, OutlinedInput, Select as MuiSelect } from "@material-ui/core";
import * as React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { LangContext } from "../project/Context";

export const Select = React.memo<{
  id: string;
  label: React.ReactNode;
  value: string;
  onChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>, child: React.ReactNode) => void;
  children: React.ReactNode;
}>(({ id, label, value, onChange, children }) => {
  const lang = useContext(LangContext);

  const labelRef = useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    if (labelRef.current != null) {
      setLabelWidth(labelRef.current.offsetWidth);
    }
  }, [lang]);

  return (
    <FormControl variant="outlined">
      <InputLabel ref={labelRef} htmlFor={id}>
        {label}
      </InputLabel>
      <MuiSelect input={<OutlinedInput labelWidth={labelWidth} id={id} />} value={value} onChange={onChange}>
        {children}
      </MuiSelect>
    </FormControl>
  );
});
