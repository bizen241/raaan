import React from "react";
import { GroupBufferList } from "../../lists/groups/GroupBufferList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const EditGroupsPage = React.memo<PageProps>(() => {
  return (
    <Page title="未保存のグループ">
      <GroupBufferList />
    </Page>
  );
});
