import { Link, LinkOff, Refresh } from "@material-ui/icons";
import React from "react";
import { withEntity } from "../../enhancers/withEntity";
import { useToggleState } from "../../hooks/useToggleState";
import { RegenerateGroupSecretDialog } from "../dialogs/group-secrets/RegenerateGroupSecretDialog";
import { RevokeGroupSecretDialog } from "../dialogs/group-secrets/RevokeGroupSecretDialog";
import { Button, Card, Column, Property } from "../ui";

export const GroupSecretViewer = withEntity("GroupSecret")(
  React.memo(({ entity: groupSecret }) => {
    const [isRegenerateDialogOpen, onToggleRegenerateDialog] = useToggleState();
    const [isRevokeDialogOpen, onToggleRevokeDialog] = useToggleState();

    const link = `http://localhost:8080/groups/${groupSecret.groupId}/invite/${groupSecret.value}`;

    return (
      <Column>
        <Button icon={<Refresh />} label="リンクを再生成" onClick={onToggleRegenerateDialog} />
        <Button icon={<LinkOff />} label="リンクを無効化" onClick={onToggleRevokeDialog} />
        <Card icon={<Link />} title="招待用リンク">
          <Property label="リンク">{link}</Property>
          <Property label="有効期限">{new Date(groupSecret.expireAt).toLocaleString()}</Property>
        </Card>
        <RegenerateGroupSecretDialog
          groupSecretId={groupSecret.id}
          isOpen={isRegenerateDialogOpen}
          onClose={onToggleRegenerateDialog}
        />
        <RevokeGroupSecretDialog
          groupSecretId={groupSecret.id}
          isOpen={isRevokeDialogOpen}
          onClose={onToggleRevokeDialog}
        />
      </Column>
    );
  })
);
