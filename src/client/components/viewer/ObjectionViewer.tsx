import { SmsFailed } from "@material-ui/icons";
import * as React from "react";
import { Objection } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { Card, Column, Property } from "../ui";

export const ObjectionViewer = withEntity<Objection, {}>({ entityType: "Objection" })(({ entity: objection }) => {
  return (
    <Column>
      <Card icon={<SmsFailed />} title="異議">
        <Property label="説明">{objection.description}</Property>
        <Property label="状態">{objection.state}</Property>
        <Property label="コメント">{objection.comment}</Property>
      </Card>
    </Column>
  );
});
