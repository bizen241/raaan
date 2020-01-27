import React from "react";
import { TagEditor } from "../../editors/TagEditor";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const EditTagPage = React.memo<PageProps>(({ match }) => {
  const tagId = match.params.id;

  return (
    <Page title="タグを編集中">
      <TagEditor bufferId={tagId} />
    </Page>
  );
});
