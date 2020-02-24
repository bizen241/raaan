import { Dns, Edit } from "@material-ui/icons";
import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { TagSummaryList } from "../../lists/tag-summaries/TagSummaryList";
import { Button } from "../../ui";

export const TagsPage = createPage()(
  React.memo(({ t }) => t("タグを探す")),
  React.memo(() => {
    const { currentUser } = useCurrentUser();

    const isOwner = currentUser.permission === "Owner";

    return (
      <>
        {isOwner && <Button icon={<Edit />} label="編集中のタグ" to={`/tags/edit`} />}
        <Button icon={<Dns />} label="タグの別名" to={`/synonyms`} />
        <TagSummaryList initialParams={{}} />
      </>
    );
  })
);
