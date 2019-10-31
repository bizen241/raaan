import * as React from "react";
import { TagBufferList } from "../../list/tags/TagBufferList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const EditTagsPage = React.memo<PageProps>(() => {
  return (
    <Page title="未保存のタグ">
      <TagBufferList />
    </Page>
  );
});
