import { MenuItem } from "@blueprintjs/core";
import * as React from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { EntityList, EntityListItemProps, EntityListProps } from ".";
import { ExerciseSummary } from "../../../../shared/api/entities";
import { PopMenu, Row } from "../../ui";

export const ExerciseList = React.memo<EntityListProps<ExerciseSummary>>(props => {
  return <EntityList {...props} entityType="ExerciseSummary" itemComponent={ExerciseListItem} />;
});

const ExerciseListItem = React.memo<EntityListItemProps<ExerciseSummary>>(({ entity: exerciseSummary, onDelete }) => {
  return (
    <Row center="cross">
      <Row flex={1}>
        <Link style={{ flex: 1 }} to={`/exercises/${exerciseSummary.exerciseId}/edit`}>
          {exerciseSummary.title || "無題"}
        </Link>
      </Row>
      <PopMenu
        items={[
          <MenuItem key="p" text="プレビュー (p)" />,
          <MenuItem
            key="d"
            text="削除 (d)"
            onClick={useCallback(() => onDelete(exerciseSummary.id), [])}
            intent="danger"
          />
        ]}
        hotKeys={{}}
      />
    </Row>
  );
});
