import { Dns, Edit, LocalOffer, Timeline } from "@material-ui/icons";
import React, { useContext } from "react";
import { withEntity } from "../../enhancers/withEntity";
import { useEntity } from "../../hooks/useEntity";
import { UserContext } from "../project/Context";
import { Card, Menu, MenuItem, Property } from "../ui";

export const TagSummaryViewer = withEntity("TagSummary")(
  React.memo(({ entity: tagSummary }) => {
    const currentUser = useContext(UserContext);

    const { tagId, name } = tagSummary;

    const { entity: tag } = useEntity("Tag", tagId, false);
    if (tag === undefined) {
      return null;
    }

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
  })
);
