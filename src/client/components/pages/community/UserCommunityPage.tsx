import { Group, Notifications, Report, SmsFailed, ThumbsUpDown, WbIncandescent } from "@material-ui/icons";
import React from "react";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { Button } from "../../ui";

export const UserCommunityPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  const { currentUserId, currentUser } = useCurrentUser();

  const isOwn = currentUserId === userId;
  const isOwner = currentUser.permission === "Owner";

  const hasPermission = (isOwn && !isOwner) || (!isOwn && isOwner);

  return (
    <Page title={isOwn ? "自分のコミュニティ" : "ユーザーのコミュニティ"}>
      <Button color="primary" icon={<Group />} label="グループ" to={`/users/${userId}/groups`} />
      <Button icon={<Notifications />} label="フォロー" to={`/users/${userId}/follow`} />
      <Button icon={<WbIncandescent />} label="提案" to={`/users/${userId}/suggestions`} />
      <Button icon={<ThumbsUpDown />} label="評価" to={`/users/${userId}/votes`} />
      {hasPermission && (
        <Button icon={<Report />} label="報告" to={`/users/${userId}/reports${isOwner ? "" : "/uploaded"}`} />
      )}
      {hasPermission && <Button icon={<SmsFailed />} label="抗議" to={`/users/${userId}/objections`} />}
    </Page>
  );
});
