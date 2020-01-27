import React from "react";
import { UserGroupApplicationList } from "../../lists/group-applications/UserGroupApplicationList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const UserGroupApplicationsPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  return (
    <Page title="自分の申請一覧">
      <UserGroupApplicationList
        initialParams={{
          applicantId: userId
        }}
      />
    </Page>
  );
});
