import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { TagFollowList } from "../../lists/tag-follows/TagFollowList";

export const FollowingTagsPage = createPage<"User">()(
  React.memo(({ t }) => t("フォロー中のタグ")),
  React.memo(({ entityId: userId }) => {
    return (
      <TagFollowList
        initialParams={{
          followerId: userId
        }}
      />
    );
  })
);
