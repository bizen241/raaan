import { Link, Refresh } from "@material-ui/icons";
import * as React from "react";
import { GroupSecret } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { Button, Card, Column, Property } from "../ui";

export const GroupSecretViewer = withEntity<GroupSecret>({ entityType: "GroupSecret" })(
  React.memo(({ entity: groupSecret }) => {
    const link = `http://localhost:8080/groups/${groupSecret.groupId}/${groupSecret.value}`;

    return (
      <Column>
        <Button icon={<Refresh />} label="再生成" />
        <Card icon={<Link />} title="招待用リンク">
          <Property label="リンク">{link}</Property>
        </Card>
      </Column>
    );
  })
);
