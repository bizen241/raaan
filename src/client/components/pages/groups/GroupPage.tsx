import React from "react";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { GroupViewer } from "../../viewers/GroupViewer";

export const GroupPage = React.memo<PageProps>(props => {
  const groupId = props.match.params.id;

  return (
    <Page title="グループの詳細">
      <GroupViewer entityId={groupId} />
    </Page>
  );
});
