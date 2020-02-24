import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useSearch } from "../../../hooks/useSearch";
import { TagViewer } from "../../viewers/TagViewer";

export const TagPage = createPage()(
  React.memo(({ t }) => t("タグの詳細")),
  React.memo(({ name: tagName }) => {
    const { entities: tags } = useSearch("Tag", {
      name: tagName
    });
    const tag = tags[0];

    return <TagViewer entityId={tag.id} />;
  })
);
