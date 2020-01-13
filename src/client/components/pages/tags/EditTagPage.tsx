import React from "react";
import { TagEditor } from "../../editor/TagEditor";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const EditTagPage = React.memo<PageProps>(({ match }) => {
  const tagId = match.params.id;

  return (
    <Page title="タグを編集中">
      <TagEditor bufferId={tagId} />
    </Page>
  );
});
