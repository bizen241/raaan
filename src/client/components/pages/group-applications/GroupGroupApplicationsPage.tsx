import * as React from "react";
import { GroupGroupApplicationList } from "../../list/group-applications/GroupGroupApplicationList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const GroupGroupApplicationsPage = React.memo<PageProps>(props => {
  const groupId = props.match.params.id;

  return (
    <Page title="招待一覧">
      <GroupGroupApplicationList
        initialParams={{
          groupId
        }}
      />
    </Page>
  );
});
