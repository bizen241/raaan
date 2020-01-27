import React from "react";
import { GroupSummaryList } from "../../lists/group-summaries/GroupSummaryList";
import { Page } from "../../project/Page";

export const GroupsPage = React.memo(() => {
  return (
    <Page title="グループを探す">
      <GroupSummaryList initialParams={{}} />
    </Page>
  );
});
