import * as React from "react";
import { TagFollowerList } from "../../list/tag-follows/TagFollowerList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const TagFollowersPage = React.memo<PageProps>(({ match }) => {
  const tagId = match.params.id;

  return (
    <Page title="フォロワー">
      <TagFollowerList
        initialParams={{
          targetId: tagId
        }}
      />
    </Page>
  );
});
