import React from "react";
import { EntityId } from "../../../../shared/api/entities";
import { TagFollowList } from "../../lists/tag-follows/TagFollowList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const FollowingTagsPage = React.memo<PageProps>(({ match }) => {
  const userId = match.params.id as EntityId<"User">;

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
