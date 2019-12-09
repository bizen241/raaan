import { AddAlert, Dns, Edit, Keyboard, LocalOffer, Person } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { withEntity } from "../../enhancers/withEntity";
import { useSearch } from "../../hooks/useSearch";
import { useToggleState } from "../../hooks/useToggleState";
import { DeleteTagFollowDialog } from "../dialogs/tags/DeleteTagFollowDialog";
import { UploadTagFollowDialog } from "../dialogs/tags/UploadTagFollowDialog";
import { UserContext } from "../project/Context";
import { Button, Card, Column, Menu, MenuItem, Property } from "../ui";

export const TagViewer = withEntity("Tag")(
  React.memo(({ entityId: tagId, entity: tag }) => {
    const currentUser = useContext(UserContext);

    const [isUploadTagFollowDialogOpen, onToggleUploadTagFollowDialog] = useToggleState();
    const [isDeleteTagFollowDialogOpen, onToggleDeleteTagFollowDialog] = useToggleState();
    const { entities: follows } = useSearch("TagFollow", {
      followerId: currentUser.id,
      targetId: tagId
    });
    const follow = follows[0];
    const isFollowed = follow !== undefined;

    const isOwner = currentUser.permission === "Owner";

    return (
      <Column>
        <Button icon={<Keyboard />} label="クイズ" to={`/exercises?tags=${tag.name}`} />
        <Button icon={<Person />} label="フォロワー" to={`/tags/${tagId}/followers`} />
        {!isFollowed ? (
          <Button icon={<AddAlert />} label="フォローする" onClick={onToggleUploadTagFollowDialog} />
        ) : (
          <Button icon={<AddAlert />} label="フォロー中" onClick={onToggleDeleteTagFollowDialog} />
        )}
        <Card
          icon={<LocalOffer />}
          title={tag.name}
          action={
            <Menu>
              {isOwner && <MenuItem icon={<Edit />} label="編集する" to={`/tags/${tagId}/edit`} />}
              <MenuItem icon={<Dns />} label="タグの別名" to={`/tags/${tag.name}/synonyms`} />
            </Menu>
          }
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
