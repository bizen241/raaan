import * as React from "react";
import { TagFollowList } from "../../list/tag-follows/TagFollowList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const FollowingTagsPage = React.memo<PageProps>(({ match }) => {
  const userId = match.params.id;

  return (
    <Page title="フォロー中のタグ">
      <TagFollowList
        initialParams={{
          followerId: userId
        }}
      />
    </Page>
  );
});
