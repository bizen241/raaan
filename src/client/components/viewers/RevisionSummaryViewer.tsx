import { Edit, History, Refresh } from "@material-ui/icons";
import React from "react";
import { Revision, RevisionSummary } from "../../../shared/api/entities";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useEntity } from "../../hooks/useEntity";
import { Card, Menu, MenuItem, Property } from "../ui";

export const RevisionSummaryViewer = React.memo<{
  revision: Revision;
  revisionSummary: RevisionSummary;
}>(({ revision }) => {
  const { currentUser } = useCurrentUser();

  const { onReload } = useEntity("Revision", revision.id);
  const { entity: exercise } = useEntity("Exercise", revision.exerciseId);

  const { messageSubject, messageBody } = revision;
  const isOwn = exercise.authorId === currentUser.id;

  return (
    <Card
      icon={<History />}
      title={messageSubject || "件名なし"}
      action={
        <Menu>
          {isOwn && <MenuItem icon={<Edit />} label="編集する" to={`/revisions/${revision.id}/edit`} />}
          <MenuItem icon={<Refresh />} label="再読み込み" onClick={onReload} />
        </Menu>
      }
    >
      {messageBody && <Property label="メッセージ">{messageBody}</Property>}
      <Property label="作成日時">{new Date(revision.updatedAt).toLocaleDateString()}</Property>
    </Card>
  );
});
