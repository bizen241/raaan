import * as React from "react";
import { useMemo, useState } from "react";
import { withEntity } from "../../enhancers/withEntity";
import { useDiary } from "../../hooks/useDiary";
import { getToday, HeatMap, HeatMapContents } from "../ui";

export const ExerciseDiaryGraph = withEntity("Exercise")(({ entityId: exerciseId }) => {
  const [firstDate] = useState(getToday());
  const diaryEntries = useDiary("ExerciseDiaryEntry", firstDate, { exerciseId });

  const contents = useMemo(
    () =>
      Object.entries(diaryEntries).reduce((previousValue, [date, diaryEntry]) => {
        if (diaryEntry === undefined) {
          return previousValue;
        }

        return { ...previousValue, [date]: diaryEntry.submittedCount };
      }, {} as HeatMapContents),
    [diaryEntries]
  );

  return <HeatMap firstDate={firstDate} contents={contents} />;
});
