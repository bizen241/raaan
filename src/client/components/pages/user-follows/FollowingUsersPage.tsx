import React from "react";
import { UserFollowList } from "../../lists/user-follows/UserFollowList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const FollowingUsersPage = React.memo<PageProps>(({ match }) => {
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
