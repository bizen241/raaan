import * as React from "react";
import { UserFollowList } from "../../list/user-follows/UserFollowList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const UserFollowsPage = React.memo<PageProps>(({ match }) => {
  const userId = match.params.id;

  return (
    <Page title="フォロー中のユーザー">
      <UserFollowList
        initialParams={{
          followerId: userId
        }}
      />
    </Page>
  );
});
