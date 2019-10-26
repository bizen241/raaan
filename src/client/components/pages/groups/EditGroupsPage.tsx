import * as React from "react";
import { GroupBufferList } from "../../list/groups/GroupBufferList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const EditGroupsPage = React.memo<PageProps>(() => {
  return (
    <Page title="未保存のグループ">
      <GroupBufferList />
    </Page>
  );
});
