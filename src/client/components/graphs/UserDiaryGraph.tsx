import * as React from "react";
import { useEffect, useState } from "react";
import { withEntity } from "../../enhancers/withEntity";
import { useSearch } from "../../hooks/useSearch";
import { HeatMap, HeatMapContents } from "../ui";

export const UserDiaryGraph = withEntity("User")(({ entityId: userId }) => {
  const [contents, setContents] = useState<HeatMapContents>({});

  const { entities, count, params, status, onChange } = useSearch("UserDiaryEntry", {
    userId,
    searchLimit: 100,
    searchOffset: 0
  });

  const firstDate =
    new Date(new Date().setUTCHours(0, 0, 0, 0)).getTime() - (51 * 7 + new Date().getDay()) * 24 * 60 * 60 * 1000;

  useEffect(() => {
    if (status !== 200) {
      return;
    }

    const additionalContents: HeatMapContents = {};
    entities.forEach(entity => {
      if (entity !== undefined) {
        const date = new Date(entity.date).getTime();

        additionalContents[date] = entity.submitCount + entity.submittedCount;
      }
    });

    setContents({ ...contents, ...additionalContents });

    const lastEntity = entities[entities.length - 1];
    if (Object.keys(contents).length < count && lastEntity && new Date(lastEntity.date).getTime() > firstDate) {
      onChange({
        searchOffset: (params.searchOffset || 0) + 100
      });
    }
  }, [entities]);

  return <HeatMap firstDate={firstDate} contents={contents} />;
});
