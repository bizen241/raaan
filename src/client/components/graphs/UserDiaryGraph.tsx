import { IconButton } from "@material-ui/core";
import { Refresh, Timeline } from "@material-ui/icons";
import * as React from "react";
import { useMemo, useState } from "react";
import { withEntity } from "../../enhancers/withEntity";
import { useDiary } from "../../hooks/useDiary";
import { Card, getToday, HeatMap, HeatMapContents, Property } from "../ui";

export const UserDiaryGraph = withEntity("User")(({ entityId: userId }) => {
  const [firstDate] = useState(getToday());
  const [selectedDate, selectDate] = useState(firstDate.toString());

  const { diaryEntries, onReload } = useDiary("UserDiaryEntry", firstDate, { userId });

  const contents = useMemo(
    () =>
      Object.entries(diaryEntries).reduce((previousValue, [date, diaryEntry]) => {
        if (diaryEntry === undefined) {
          return previousValue;
        }

        return { ...previousValue, [date]: diaryEntry.submitCount + diaryEntry.submittedCount };
      }, {} as HeatMapContents),
    [diaryEntries]
  );

  const selectedDiaryEntry = diaryEntries[selectedDate];

  return (
    <Card
      icon={<Timeline />}
      title="記録"
      action={
        <IconButton onClick={onReload}>
          <Refresh />
        </IconButton>
      }
    >
      <HeatMap firstDate={firstDate} contents={contents} onClick={selectDate} />
      <Property label="日付">{new Date(Number(selectedDate)).toLocaleDateString()}</Property>
      <Property label="タイプ数">{(selectedDiaryEntry && selectedDiaryEntry.typeCount) || 0}</Property>
      <Property label="提出回数">{(selectedDiaryEntry && selectedDiaryEntry.submitCount) || 0}</Property>
    </Card>
  );
});
