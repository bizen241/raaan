import * as React from "react";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";
import { GroupViewer } from "../../viewer/GroupViewer";

export const GroupPage = React.memo<PageProps>(props => {
  const groupId = props.match.params.id;

  return (
    <Page title="グループの詳細">
      <GroupViewer entityId={groupId} />
    </Page>
  );
});
