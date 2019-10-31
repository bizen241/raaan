import * as React from "react";
import { GroupList } from "../../list/groups/GroupList";
import { Page } from "../../ui";

export const GroupsPage = React.memo(() => {
  return (
    <Page title="グループを探す">
      <GroupList initialParams={{}} />
    </Page>
  );
});
