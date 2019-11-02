import * as React from "react";
import { UserFollowList } from "../../list/user-follows/UserFollowList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const UserFollowersPage = React.memo<PageProps>(({ match }) => {
  const userId = match.params.id;

  return (
    <Page title="フォロワー">
      <UserFollowList
        initialParams={{
          targetId: userId
        }}
      />
    </Page>
  );
});
