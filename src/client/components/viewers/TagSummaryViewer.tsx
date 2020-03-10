import { Dns, Edit, LocalOffer, Timeline } from "@material-ui/icons";
import React from "react";
import { Tag } from "../../../shared/api/entities";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useEntity } from "../../hooks/useEntity";
import { Card, Menu, MenuItem, Property } from "../ui";

export const TagSummaryViewer = React.memo<{
  tag: Tag;
}>(({ tag }) => {
  const { currentUser } = useCurrentUser();

  const { entity: tagSummary } = useEntity("TagSummary", tag.summaryId);
  const { tagId, name } = tagSummary;

  const isOwner = currentUser.permission === "Owner";

  return (
    <Card
      icon={<LocalOffer />}
      title={name}
      action={
        <Menu>
          {isOwner && <MenuItem icon={<Edit />} label="編集する" to={`/tags/${tagId}/edit`} />}
          <MenuItem icon={<Dns />} label="タグの別名" to={`/tags/${name}/synonyms`} />
          <MenuItem icon={<Timeline />} label="記録" to={`/tags/${tagId}/diary`} />
        </Menu>
      }
    >
      <Property label="説明">{tag.description}</Property>
      <Property label="更新日時">{new Date(tag.updatedAt).toLocaleDateString()}</Property>
    </Card>
  );
});
