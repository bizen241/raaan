import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { TagDiaryGraph } from "../../graphs/TagDiaryGraph";

export const TagDiaryPage = createPage<"Tag">()(
  React.memo(({ t }) => t("タグの記録")),
  React.memo(({ entityId: tagId }) => {
    return (
      <TagDiaryGraph
        params={{
          targetId: tagId,
        }}
      />
    );
  })
);
