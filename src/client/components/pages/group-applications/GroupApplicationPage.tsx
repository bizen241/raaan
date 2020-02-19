import React from "react";
import { EntityId } from "../../../../shared/api/entities";
import { GroupApplicationEditor } from "../../editors/GroupApplicationEditor";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const GroupApplicationPage = React.memo<PageProps>(props => {
  const groupId = props.match.params.id as EntityId<"Group">;
  const secret = props.match.params.secret;

  return (
    <Page title="グループへの参加を申請">
      <GroupApplicationEditor groupId={groupId} groupSecretValue={secret} />
    </Page>
  );
});
