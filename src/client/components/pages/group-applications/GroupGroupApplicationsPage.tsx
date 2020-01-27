import React from "react";
import { GroupGroupApplicationList } from "../../lists/group-applications/GroupGroupApplicationList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const GroupGroupApplicationsPage = React.memo<PageProps>(props => {
  const groupId = props.match.params.id;

  return (
    <Page title="申請一覧">
      <GroupGroupApplicationList
        initialParams={{
          groupId
        }}
      />
    </Page>
  );
});
