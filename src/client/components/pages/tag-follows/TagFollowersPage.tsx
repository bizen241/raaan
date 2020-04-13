import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { TagFollowerList } from "../../lists/tag-follows/TagFollowerList";

export const TagFollowersPage = createPage<"Tag">()(
  React.memo(({ t }) => t("タグのフォロワー")),
  React.memo(({ entityId: tagId }) => {
    return (
      <TagFollowerList
        initialParams={{
          targetId: tagId,
        }}
      />
    );
  })
);
