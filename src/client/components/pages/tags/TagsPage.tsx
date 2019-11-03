import { Dns, Edit } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { TagSummaryList } from "../../list/tag-summaries/TagSummaryList";
import { UserContext } from "../../project/Context";
import { Button, Page } from "../../ui";

export const TagsPage = React.memo(() => {
  const currentUser = useContext(UserContext);

  const isOwner = currentUser.permission === "Owner";

  return (
    <Page title="タグを探す">
      {isOwner && <Button icon={<Edit />} label="編集中のタグ" to={`/tags/edit`} />}
      <Button icon={<Dns />} label="タグの別名" to={`/synonyms`} />
      <TagSummaryList initialParams={{}} />
    </Page>
  );
});
