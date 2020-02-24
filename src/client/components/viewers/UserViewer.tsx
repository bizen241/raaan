import { Group, History, Keyboard, PersonAdd, PlaylistPlay } from "@material-ui/icons";
import React from "react";
import { EntityId } from "../../../shared/api/entities";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useEntity } from "../../hooks/useEntity";
import { useSearch } from "../../hooks/useSearch";
import { useToggleState } from "../../hooks/useToggleState";
import { DeleteUserFollowDialog } from "../dialogs/users/DeleteUserFollowDialog";
import { UploadUserFollowDialog } from "../dialogs/users/UploadUserFollowDialog";
import { Button, Column } from "../ui";
import { UserSummaryViewer } from "./UserSummaryViewer";

export const UserViewer = React.memo<{ userId: EntityId<"User"> }>(({ userId }) => {
  const { currentUserId } = useCurrentUser();

  const { entity: user } = useEntity("User", userId);

  const [isUploadUserFollowDialogOpen, onToggleUploadUserFollowDialog] = useToggleState();
  const [isDeleteUserFollowDialogOpen, onToggleDeleteUserFollowDialog] = useToggleState();
  const { entities: follows } = useSearch("UserFollow", {
    followerId: currentUserId,
    targetId: userId
  });
  const follow = follows[0];
  const isFollowed = follow !== undefined;

  const isOwn = userId === currentUserId;

  return (
    <Column>
      {isOwn && <Button color="primary" icon={<History />} label="提出履歴" to="/user/submissions" />}
      <Button
        color={isOwn ? undefined : "primary"}
        icon={<Keyboard />}
        label="問題集"
        to={`/users/${userId}/exercises`}
      />
      <Button icon={<PlaylistPlay />} label="プレイリスト" to={`/users/${userId}/playlists`} />
      <Button icon={<Group />} label="コミュニティ" to={`/users/${userId}/community`} />
      {!isOwn && !isFollowed && (
        <Button icon={<PersonAdd />} label="フォローする" onClick={onToggleUploadUserFollowDialog} />
      )}
      {!isOwn && isFollowed && (
        <Button icon={<PersonAdd />} label="フォロー中" onClick={onToggleDeleteUserFollowDialog} />
      )}
      <Column pb={1}>
        <UserSummaryViewer entityId={user.summaryId} />
      </Column>
      <UploadUserFollowDialog
        targetId={userId}
        isOpen={isUploadUserFollowDialogOpen}
        onClose={onToggleUploadUserFollowDialog}
      />
      {follow && (
        <DeleteUserFollowDialog
          userFollowId={follow.id}
          isOpen={isDeleteUserFollowDialogOpen}
          onClose={onToggleDeleteUserFollowDialog}
        />
      )}
    </Column>
  );
});
