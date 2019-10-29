import { Group as GroupIcon, Keyboard } from "@material-ui/icons";
import * as React from "react";
import { Group } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { Button, Card, Column, Property } from "../ui";

export const GroupViewer = withEntity<Group, {}>({ entityType: "Group" })(({ entityId: groupId, entity: group }) => {
  return (
    <Column>
      <Button icon={<Keyboard />} label="クイズ" color="primary" to={`/group/${groupId}/group-exercises`} />
      <Card icon={<GroupIcon />} title={group.name}>
        <Property label="説明">{group.description}</Property>
      </Card>
    </Column>
  );
});
