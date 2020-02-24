import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { TagBufferList } from "../../lists/tags/TagBufferList";

export const EditTagsPage = createPage()(
  React.memo(({ t }) => t("未保存のタグ")),
  React.memo(() => {
    return <TagBufferList />;
  })
);
