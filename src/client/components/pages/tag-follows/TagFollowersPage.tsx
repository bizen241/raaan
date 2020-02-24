import React from "react";
import { EntityId } from "../../../../shared/api/entities";
import { TagFollowerList } from "../../lists/tag-follows/TagFollowerList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const TagFollowersPage = React.memo<PageProps>(({ match }) => {
  const tagId = match.params.id as EntityId<"Tag">;

  return (
    <Page title="タグのフォロワー">
      <TagFollowerList
        initialParams={{
          targetId: tagId
        }}
      />
    </Page>
  );
});
