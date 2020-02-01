import { Edit, History, Refresh } from "@material-ui/icons";
import React, { useContext } from "react";
import { Revision, RevisionSummary } from "../../../shared/api/entities";
import { useEntity } from "../../hooks/useEntity";
import { UserContext } from "../project/Context";
import { Loading } from "../project/Loading";
import { Card, Menu, MenuItem, Property } from "../ui";

export const RevisionSummaryViewer = React.memo<{
  revision: Revision;
  revisionSummary: RevisionSummary;
}>(({ revision }) => {
  const currentUser = useContext(UserContext);

  const { onReload } = useEntity("Revision", revision.id);
  const { entity: exercise, ...exerciseProps } = useEntity("Exercise", revision.exerciseId);
  if (exercise === undefined) {
    return <Loading {...exerciseProps} />;
  }

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
