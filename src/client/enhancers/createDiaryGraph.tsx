import { Refresh, Timeline } from "@material-ui/icons";
import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { EntityTypeToEntity } from "../../shared/api/entities";
import { Params } from "../../shared/api/request/params";
import { FetchErrorBoundary } from "../components/boundaries/FetchErrorBoundary";
import { Card, getToday, HeatMap, HeatMapContents, IconButton, Property } from "../components/ui";
import { useDiary } from "../hooks/useDiary";
import { actions } from "../reducers";

export type DiaryEntryType =
  | "AppDiaryEntry"
  | "ExerciseDiaryEntry"
  | "PlaylistDiaryEntry"
  | "TagDiaryEntry"
  | "UserDiaryEntry";

interface DiaryGraphProps<T extends DiaryEntryType> {
  params: Params<EntityTypeToEntity[T]>;
}

interface PropertyComponentProps<T extends DiaryEntryType> {
  diaryEntry: EntityTypeToEntity[T] | undefined;
}

export const createDiaryGraph = <T extends DiaryEntryType>(entityType: T) => (
  PropertyComponent: React.ComponentType<PropertyComponentProps<T>>
) =>
  React.memo<DiaryGraphProps<T>>(({ params }) => {
    const dispatch = useDispatch();

    const onReload = () => dispatch(actions.cache.purge(entityType, params));

    return (
      <Card icon={<Timeline />} title="記録" action={<IconButton icon={Refresh} onClick={onReload} />}>
        <FetchErrorBoundary>
          <DiaryGraphRenderer entityType={entityType} params={params} component={PropertyComponent} />
        </FetchErrorBoundary>
      </Card>
    );
  });

interface DiaryGraphRendererProps<T extends DiaryEntryType> {
  entityType: T;
  params: Params<EntityTypeToEntity[T]>;
  component: React.ComponentType<PropertyComponentProps<T>>;
}

const DiaryGraphRenderer = <T extends DiaryEntryType>({
  entityType,
  params,
  component: Renderer,
}: DiaryGraphRendererProps<T>) => {
  const [firstDate] = useState(getToday());
  const [selectedDate, selectDate] = useState(firstDate.toString());

  const { diaryEntries } = useDiary(entityType, firstDate, params);

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

  const selectedDiaryEntry = diaryEntries[selectedDate];

  return (
    <>
      <HeatMap firstDate={firstDate} contents={contents} onClick={selectDate} />
      <Property label="日付">{new Date(Number(selectedDate)).toLocaleDateString()}</Property>
      <Renderer diaryEntry={selectedDiaryEntry} />
    </>
  );
};
