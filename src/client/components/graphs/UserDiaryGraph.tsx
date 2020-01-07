import * as React from "react";
import { useMemo, useState } from "react";
import { withEntity } from "../../enhancers/withEntity";
import { useDiary } from "../../hooks/useDiary";
import { getToday, HeatMap, HeatMapContents } from "../ui";

export const UserDiaryGraph = withEntity("User")(({ entityId: userId }) => {
  const [firstDate] = useState(getToday());
  const diaryEntries = useDiary("UserDiaryEntry", firstDate, { userId });

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

  return <HeatMap firstDate={firstDate} contents={contents} />;
});
