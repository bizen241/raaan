import { History, PlayArrow } from "@material-ui/icons";
import * as React from "react";
import { Revision } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { Button, Card, Column, Property } from "../ui";

export const RevisionViewer = withEntity<Revision>({ entityType: "Revision" })(
  React.memo(({ entity: revision }) => {
    return (
      <Column>
        <Button color="primary" icon={<PlayArrow />} label="プレビュー" />
        <Card icon={<History />} title={revision.title}>
          <Property label="題名">{revision.title}</Property>
        </Card>
      </Column>
    );
  })
);
