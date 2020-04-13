import { NativeSelect, OutlinedInput, Typography } from "@material-ui/core";
import React from "react";
import { Column } from "./Column";

interface SelectOption {
  label: React.ReactNode;
  disabled?: boolean;
  hidden?: boolean;
}

export type SelectOptions<T extends string | number> = { [P in T]: SelectOption };

export const Select = <T extends string | number>({
  label,
  defaultValue,
  onChange,
  options,
}: {
  label: React.ReactNode;
  defaultValue: T | undefined;
  onChange: (value: T) => void;
  options: SelectOptions<T>;
}) => {
  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value as T);

  return (
    <Column component="label" pb={1}>
      <Typography color="textSecondary">{label}</Typography>
      <NativeSelect input={<OutlinedInput labelWidth={0} />} defaultValue={defaultValue} onChange={onSelect}>
        {defaultValue === undefined && (
          <option value="" disabled>
            選択してください
          </option>
        )}
        {Object.entries<SelectOption>(options).map(([optionValue, optionSettings]) => (
          <option key={optionValue} value={optionValue} hidden={optionSettings.hidden}>
            {optionSettings.label}
          </option>
        ))}
      </NativeSelect>
    </Column>
  );
};
