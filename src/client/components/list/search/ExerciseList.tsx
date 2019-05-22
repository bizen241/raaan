import { MenuItem } from "@blueprintjs/core";
import * as React from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { EntityList, EntityListItemProps, EntityListProps } from ".";
import { Exercise } from "../../../../shared/api/entities";
import { PopMenu, Row } from "../../ui";

export const ExerciseList = React.memo<EntityListProps<Exercise>>(props => {
  return <EntityList {...props} entityType="Exercise" itemComponent={ExerciseListItem} />;
});

const ExerciseListItem = React.memo<EntityListItemProps<Exercise>>(({ entity: exercise, onDelete }) => {
  return (
    <Row center="cross">
      <Row flex={1}>
        <Link style={{ flex: 1 }} to={`/exercises/${exercise.id}/edit`}>
          {exercise.title || "無題"}
        </Link>
      </Row>
      <PopMenu
        items={[
          <MenuItem key="p" text="プレビュー (p)" />,
          <MenuItem key="d" text="削除 (d)" onClick={useCallback(() => onDelete(exercise.id), [])} intent="danger" />
        ]}
        hotKeys={{}}
      />
    </Row>
  );
});
