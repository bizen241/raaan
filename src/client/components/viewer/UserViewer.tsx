import { Group, History, Keyboard, PersonAdd, PlaylistPlay, Report } from "@material-ui/icons";
import { useContext } from "react";
import * as React from "react";
import { User, UserFollow } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { useSearch } from "../../hooks/useSearch";
import { useToggleState } from "../../hooks/useToggleState";
import { DeleteUserFollowDialog } from "../dialogs/users/DeleteUserFollowDialog";
import { UploadUserFollowDialog } from "../dialogs/users/UploadUserFollowDialog";
import { UserContext } from "../project/Context";
import { Button, Column } from "../ui";
import { UserSummaryViewer } from "./UserSummaryViewer";

export const UserViewer = withEntity<User, {}>({ entityType: "User" })(({ entityId: userId, entity: user }) => {
  const currentUser = useContext(UserContext);

  const [isUploadUserFollowDialogOpen, onToggleUploadUserFollowDialog] = useToggleState();
  const [isDeleteUserFollowDialogOpen, onToggleDeleteUserFollowDialog] = useToggleState();
  const { entities: follows } = useSearch<UserFollow>("UserFollow", {
    followerId: currentUser.id,
    targetId: userId
  });
  const follow = follows[0];
  const isFollowed = follow !== undefined;

  const isOwn = userId === currentUser.id;
  const isOwner = currentUser.permission === "Owner";

  return (
    <Column>
      {isOwn && <Button color="primary" icon={<History />} label="提出履歴" to="/user/submissions" />}
      <Button
        color={isOwn ? "default" : "primary"}
        icon={<Keyboard />}
        label="クイズ"
        to={`/users/${userId}/exercises`}
      />
      <Button
        color={isOwn ? "default" : "primary"}
        icon={<PlaylistPlay />}
        label="プレイリスト"
        to={`/users/${userId}/playlists`}
      />
      {!isOwn && !isFollowed && (
        <Button icon={<PersonAdd />} label="フォローする" onClick={onToggleUploadUserFollowDialog} />
      )}
      {!isOwn && isFollowed && (
        <Button icon={<PersonAdd />} label="フォロー中" onClick={onToggleDeleteUserFollowDialog} />
      )}
      <Column pb={1}>
        <UserSummaryViewer entityId={user.summaryId} />
      </Column>
      <Button icon={<Group />} label="グループ" to={`/users/${userId}/group-members`} />
      {isOwner && <Button icon={<Report />} label="報告一覧" to={`/users/${userId}/reports`} />}
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
