import * as React from "react";
import { UserGroupApplicationList } from "../../list/group-applications/UserGroupApplicationList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

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
