import { useCallback, useEffect, useState } from "react";
import { EntityObject, EntityTypeToEntity } from "../../shared/api/entities";
import { Params } from "../../shared/api/request/params";
import { useSearch } from "./useSearch";

type DiaryEntryType = "AppDiaryEntry" | "ExerciseDiaryEntry" | "UserDiaryEntry";

interface DateToDiaryEntry<E extends EntityObject> {
  [date: string]: E | undefined;
}

export const useDiary = <T extends DiaryEntryType>(
  entityType: T,
  firstDate: number,
  condition: Params<EntityTypeToEntity[T]>
) => {
  const [diaryEntries, setDiaryEntries] = useState<DateToDiaryEntry<EntityTypeToEntity[T]>>({});

  const { entities, count, params, status, onChange, onReload } = useSearch(entityType, {
    ...condition,
    searchLimit: 100,
    searchOffset: 0
  });

  useEffect(() => {
    if (status !== 200) {
      return;
    }

    const additionalContents: DateToDiaryEntry<EntityTypeToEntity[T]> = {};
    entities.forEach(entity => {
      if (entity !== undefined) {
        const date = new Date(entity.date).getTime();

        additionalContents[date] = entity;
      }
    });

    setDiaryEntries({ ...diaryEntries, ...additionalContents });

    const lastEntity = entities[entities.length - 1];
    const isIncompleted =
      Object.keys(diaryEntries).length < count && lastEntity && new Date(lastEntity.date).getTime() > firstDate;
    if (isIncompleted) {
      onChange({
        searchOffset: ((params.searchOffset || 0) as number) + 100
      } as Params<EntityTypeToEntity[T]>);
    }
  }, [entities]);

  return {
    diaryEntries,
    onReload: useCallback(() => onReload(), [])
  };
};
