import { Group, History, Keyboard, PersonAdd, PlaylistPlay } from "@material-ui/icons";
import { useContext } from "react";
import * as React from "react";
import { withEntity } from "../../enhancers/withEntity";
import { useSearch } from "../../hooks/useSearch";
import { useToggleState } from "../../hooks/useToggleState";
import { DeleteUserFollowDialog } from "../dialogs/users/DeleteUserFollowDialog";
import { UploadUserFollowDialog } from "../dialogs/users/UploadUserFollowDialog";
import { UserContext } from "../project/Context";
import { Button, Column } from "../ui";
import { UserSummaryViewer } from "./UserSummaryViewer";

export const UserViewer = withEntity("User")(({ entityId: userId, entity: user }) => {
  const currentUser = useContext(UserContext);

  const [isUploadUserFollowDialogOpen, onToggleUploadUserFollowDialog] = useToggleState();
  const [isDeleteUserFollowDialogOpen, onToggleDeleteUserFollowDialog] = useToggleState();
  const { entities: follows } = useSearch("UserFollow", {
    followerId: currentUser.id,
    targetId: userId
  });
  const follow = follows[0];
  const isFollowed = follow !== undefined;

  const isOwn = userId === currentUser.id;

  return (
    <Column>
      {isOwn && <Button color="primary" icon={<History />} label="提出履歴" to="/user/submissions" />}
      <Button
        color={isOwn ? undefined : "primary"}
        icon={<Keyboard />}
        label="クイズ"
        to={`/users/${userId}/contents/exercises`}
      />
      <Button icon={<PlaylistPlay />} label="プレイリスト" to={`/users/${userId}/contents/playlists`} />
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
