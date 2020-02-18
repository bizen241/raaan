import { useCallback, useEffect, useState } from "react";
import { EntityObject, EntityTypeToEntity } from "../../shared/api/entities";
import { Params } from "../../shared/api/request/params";
import { useSearch } from "./useSearch";

type DiaryEntryType =
  | "AppDiaryEntry"
  | "ExerciseDiaryEntry"
  | "PlaylistDiaryEntry"
  | "TagDiaryEntry"
  | "UserDiaryEntry";

interface DateToDiaryEntry<E extends EntityObject> {
  [date: string]: E | undefined;
}

export const useDiary = <T extends DiaryEntryType>(
  entityType: T,
  firstDate: number,
  condition: Params<EntityTypeToEntity[T]>
) => {
  const [diaryEntries, setDiaryEntries] = useState<DateToDiaryEntry<EntityTypeToEntity[T]>>({});

  const { entityIds, entityMap, count, params, status, onChange, onReload } = useSearch<T>(entityType, {
    ...condition,
    searchLimit: 100,
    searchOffset: 0
  });

  useEffect(() => {
    if (status !== 200) {
      return;
    }

    const additionalContents: DateToDiaryEntry<EntityTypeToEntity[T]> = {};
    entityIds.forEach(entityId => {
      const entity = entityMap[entityId];
      if (entity === undefined) {
        return;
      }

      additionalContents[entity.date] = entity as EntityTypeToEntity[T];
    });

    setDiaryEntries({ ...diaryEntries, ...additionalContents });

    const lastEntity = entityMap[entityIds.length - 1];
    const isIncompleted =
      Object.keys(diaryEntries).length < count && lastEntity && new Date(lastEntity.date).getTime() > firstDate;
    if (isIncompleted) {
      onChange({
        searchOffset: ((params.searchOffset || 0) as number) + 100
      } as Params<EntityTypeToEntity[T]>);
    }
  }, [entityIds]);

  return {
    diaryEntries,
    onReload: useCallback(() => onReload(), [])
  };
};
