import React from "react";
import { GroupEditor } from "../../editors/GroupEditor";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const EditGroupPage = React.memo<PageProps>(({ match }) => {
  const groupId = match.params.id;

  return (
    <Page title="グループを編集中">
      <GroupEditor bufferId={groupId} />
    </Page>
  );
});
