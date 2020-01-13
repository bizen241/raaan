import React from "react";
import { GroupSummaryList } from "../../list/group-summaries/GroupSummaryList";
import { Page } from "../../ui";

export const GroupsPage = React.memo(() => {
  return (
    <Page title="グループを探す">
      <GroupSummaryList initialParams={{}} />
    </Page>
  );
});
