import { AddAlert, Edit, Label, Person } from "@material-ui/icons";
import { useContext } from "react";
import * as React from "react";
import { Tag, TagFollow } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { useSearch } from "../../hooks/useSearch";
import { useToggleState } from "../../hooks/useToggleState";
import { DeleteTagFollowDialog } from "../dialogs/tags/DeleteTagFollowDialog";
import { UploadTagFollowDialog } from "../dialogs/tags/UploadTagFollowDialog";
import { UserContext } from "../project/Context";
import { Button, Card, Column, Menu, MenuItem, Property } from "../ui";

export const TagViewer = withEntity<Tag>({ entityType: "Tag" })(
  React.memo(({ entityId: tagId, entity: tag }) => {
    const currentUser = useContext(UserContext);

    const [isUploadTagFollowDialogOpen, onToggleUploadTagFollowDialog] = useToggleState();
    const [isDeleteTagFollowDialogOpen, onToggleDeleteTagFollowDialog] = useToggleState();
    const { entities: follows } = useSearch<TagFollow>("TagFollow", {
      followerId: currentUser.id,
      targetId: tagId
    });
    const follow = follows[0];
    const isFollowed = follow !== undefined;

    const isOwner = currentUser.permission === "Owner";

    return (
      <Column>
        <Button icon={<Person />} label="フォロワー" to={`/tags/${tagId}/followers`} />
        {!isFollowed ? (
          <Button icon={<AddAlert />} label="フォローする" onClick={onToggleUploadTagFollowDialog} />
        ) : (
          <Button icon={<AddAlert />} label="フォロー中" onClick={onToggleDeleteTagFollowDialog} />
        )}
        <Card
          icon={<Label />}
          title={tag.name}
          action={<Menu>{isOwner && <MenuItem icon={<Edit />} label="編集する" to={`/tags/${tagId}/edit`} />}</Menu>}
        >
          <Property label="説明">{tag.description}</Property>
          <Property label="更新日時">{new Date(tag.updatedAt).toLocaleDateString()}</Property>
        </Card>
        <UploadTagFollowDialog
          targetId={tagId}
          isOpen={isUploadTagFollowDialogOpen}
          onClose={onToggleUploadTagFollowDialog}
        />
        {follow && (
          <DeleteTagFollowDialog
            tagFollowId={follow.id}
            isOpen={isDeleteTagFollowDialogOpen}
            onClose={onToggleDeleteTagFollowDialog}
          />
        )}
      </Column>
    );
  })
);
