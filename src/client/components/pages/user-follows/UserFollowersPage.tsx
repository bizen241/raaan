import React from "react";
import { UserFollowerList } from "../../lists/user-follows/UserFollowerList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const UserFollowersPage = React.memo<PageProps>(({ match }) => {
  const userId = match.params.id;

  return (
    <Page title="ユーザーのフォロワー">
      <UserFollowerList
        initialParams={{
          targetId: userId
        }}
      />
    </Page>
  );
});
