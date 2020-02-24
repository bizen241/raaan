import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { UserFollowList } from "../../lists/user-follows/UserFollowList";

export const FollowingUsersPage = createPage<"User">()(
  React.memo(({ t }) => t("フォロー中のユーザー")),
  React.memo(({ entityId: userId }) => {
    return (
      <UserFollowList
        initialParams={{
          followerId: userId
        }}
      />
    );
  })
);
