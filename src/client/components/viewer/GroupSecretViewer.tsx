import { Link, LinkOff, Refresh } from "@material-ui/icons";
import * as React from "react";
import { GroupSecret } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { Button, Card, Column, Property } from "../ui";

export const GroupSecretViewer = withEntity<GroupSecret>({ entityType: "GroupSecret" })(
  React.memo(({ entity: groupSecret }) => {
    const link = `http://localhost:8080/groups/${groupSecret.groupId}/invite/${groupSecret.value}`;

    return (
      <Column>
        <Button icon={<Refresh />} label="リンクを再生成" />
        <Button icon={<LinkOff />} label="リンクを無効化" />
        <Card icon={<Link />} title="招待用リンク">
          <Property label="リンク">{link}</Property>
          <Property label="有効期限">{new Date(groupSecret.expireAt).toLocaleString()}</Property>
        </Card>
      </Column>
    );
  })
);
