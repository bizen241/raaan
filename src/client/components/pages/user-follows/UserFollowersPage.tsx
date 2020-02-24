import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { UserFollowerList } from "../../lists/user-follows/UserFollowerList";

export const UserFollowersPage = createPage<"User">()(
  React.memo(({ t }) => t("ユーザーのフォロワー")),
  React.memo(({ entityId: userId }) => {
    return (
      <UserFollowerList
        initialParams={{
          targetId: userId
        }}
      />
    );
  })
);
