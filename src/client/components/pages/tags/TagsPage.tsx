import * as React from "react";
import { TagSummaryList } from "../../list/tag-summaries/TagSummaryList";
import { Page } from "../../ui";

export const TagsPage = React.memo(() => {
  return (
    <Page title="タグを探す">
      <TagSummaryList initialParams={{}} />
    </Page>
  );
});
