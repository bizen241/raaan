import React from "react";
import { GroupEditor } from "../../editor/GroupEditor";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const EditGroupPage = React.memo<PageProps>(({ match }) => {
  const groupId = match.params.id;

  return (
    <Page title="グループを編集中">
      <GroupEditor bufferId={groupId} />
    </Page>
  );
});
