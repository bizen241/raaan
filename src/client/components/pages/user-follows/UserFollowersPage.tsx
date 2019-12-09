import * as React from "react";
import { UserFollowerList } from "../../list/user-follows/UserFollowerList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

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
