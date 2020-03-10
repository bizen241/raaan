import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { TagEditor } from "../../editors/TagEditor";

export const EditTagPage = createPage<"Tag">()(
  React.memo(({ t }) => t("タグを編集中")),
  React.memo(({ entityId: tagId }) => {
    return <TagEditor tagId={tagId} />;
  })
);
