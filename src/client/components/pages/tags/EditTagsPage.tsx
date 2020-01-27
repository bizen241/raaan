import React from "react";
import { TagBufferList } from "../../lists/tags/TagBufferList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const EditTagsPage = React.memo<PageProps>(() => {
  return (
    <Page title="未保存のタグ">
      <TagBufferList />
    </Page>
  );
});
