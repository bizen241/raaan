import { Edit, History } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { withEntity } from "../../enhancers/withEntity";
import { useEntity } from "../../hooks/useEntity";
import { UserContext } from "../project/Context";
import { Card, Menu, MenuItem, Property } from "../ui";

export const RevisionSummaryViewer = withEntity("RevisionSummary")(
  React.memo(({ entity: revisionSummary }) => {
    const currentUser = useContext(UserContext);

    const { revisionId } = revisionSummary;

    const { entity: revision } = useEntity("Revision", revisionId, false);
    const { entity: exercise } = useEntity("Exercise", revision && revision.exerciseId);
    if (revision === undefined || exercise === undefined) {
      return null;
    }

    const { messageSubject, messageBody } = revision;
    const isOwn = exercise.authorId === currentUser.id;

    return (
      <Card
        icon={<History />}
        title={messageSubject || "件名なし"}
        action={
          <Menu>{isOwn && <MenuItem icon={<Edit />} label="編集する" to={`/revisions/${revisionId}/edit`} />}</Menu>
        }
      >
        {messageBody && <Property label="メッセージ">{messageBody}</Property>}
        <Property label="作成日時">{new Date(revision.updatedAt).toLocaleDateString()}</Property>
      </Card>
    );
  })
);
