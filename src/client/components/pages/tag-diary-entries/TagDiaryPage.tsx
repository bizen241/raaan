import React from "react";
import { TagDiaryGraph } from "../../graphs/TagDiaryGraph";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";

export const TagDiaryPage = React.memo<PageProps>(props => {
  const tagId = props.match.params.id;

  return (
    <Page title="タグの記録">
      <TagDiaryGraph entityId={tagId} />
    </Page>
  );
});
