import { TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Column } from "./Column";

export const DateTimeField = React.memo<{
  defaultValue: number;
  onChange: (time: number) => void;
}>(({ defaultValue, onChange }) => {
  const [dateString, setDateString] = useState(getDateString(new Date(defaultValue)));
  const [timeString, setTimeString] = useState(getTimeString(new Date(defaultValue)));

  const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextDateString = e.target.value;
    const nextDateTime = new Date(`${nextDateString} ${timeString}`);

    onChange(nextDateTime.getTime());
    setDateString(nextDateString);
  };
  const onChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextTime = e.target.value;
    const nextDateTime = new Date(`${dateString} ${nextTime}`);

    onChange(nextDateTime.getTime());
    setTimeString(nextTime);
  };

  return (
    <>
      <Column pb={1}>
        <Typography color="textSecondary">日付</Typography>
        <TextField variant="outlined" type="date" defaultValue={dateString} onChange={onChangeDate} />
      </Column>
      <Column pb={1}>
        <Typography color="textSecondary">時刻</Typography>
        <TextField variant="outlined" type="time" defaultValue={timeString} onChange={onChangeTime} />
      </Column>
    </>
  );
});

const padding = (source: number) => source.toString().padStart(2, "0");
const getDateString = (date: Date) => `${date.getFullYear()}-${padding(date.getMonth() + 1)}-${date.getDate()}`;
const getTimeString = (date: Date) => `${padding(date.getHours())}:${padding(date.getMinutes())}`;
