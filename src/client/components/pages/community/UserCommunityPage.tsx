import { Group, Notifications, Report, SmsFailed, ThumbsUpDown } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { UserContext } from "../../project/Context";
import { PageProps } from "../../project/Router";
import { Button, Page } from "../../ui";

export const UserCommunityPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  const currentUser = useContext(UserContext);

  const isOwn = currentUser.id === userId;
  const isOwner = currentUser.permission === "Owner";

  const hasPermission = (isOwn && !isOwner) || (!isOwn && isOwner);

  return (
    <Page title={isOwn ? "自分のコミュニティ" : "ユーザーのコミュニティ"}>
      <Button color="primary" icon={<Group />} label="グループ" to={`/users/${userId}/groups`} />
      <Button icon={<Notifications />} label="フォロー" to={`/users/${userId}/follow`} />
      {hasPermission && (
        <Button icon={<Report />} label="報告履歴" to={`/users/${userId}/reports${isOwner ? "" : "/uploaded"}`} />
      )}
      {hasPermission && <Button icon={<SmsFailed />} label="抗議履歴" to={`/users/${userId}/objections`} />}
      <Button icon={<ThumbsUpDown />} label="評価履歴" to={`/users/${userId}/votes`} />
    </Page>
  );
});
