import { SmsFailed } from "@material-ui/icons";
import * as React from "react";
import { ExerciseObjection } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { Card, Column, Property } from "../ui";

export const ExerciseObjectionViewer = withEntity<ExerciseObjection, {}>({ entityType: "ExerciseObjection" })(
  ({ entity: exerciseObjection }) => {
    return (
      <Column>
        <Card icon={<SmsFailed />} title="クイズの異議">
          <Property label="状態">{exerciseObjection.state}</Property>
        </Card>
      </Column>
    );
  }
);
