import { SmsFailed } from "@material-ui/icons";
import * as React from "react";
import { withEntity } from "../../enhancers/withEntity";
import { Card, Column, Property } from "../ui";

export const ObjectionViewer = withEntity("Objection")(({ entity: objection }) => {
  return (
    <Column>
      <Card icon={<SmsFailed />} title="抗議">
        <Property label="説明">{objection.description}</Property>
        <Property label="状態">{objection.state}</Property>
        {objection.comment && <Property label="コメント">{objection.comment}</Property>}
      </Card>
    </Column>
  );
});
