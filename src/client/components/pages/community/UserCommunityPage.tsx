import { Group, Notifications, Report, SmsFailed, ThumbsUpDown, WbIncandescent } from "@material-ui/icons";
import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { Button } from "../../ui";

export const UserCommunityPage = createPage<"User">()(
  React.memo(({ entityId: userId, t }) => {
    const { currentUser } = useCurrentUser();
    const isOwn = currentUser.id === userId;

    return isOwn ? t("自分のコミュニティ") : t("ユーザーのコミュニティ");
  }),
  React.memo(({ entityId: userId }) => {
    const { currentUser } = useCurrentUser();

    const isOwn = currentUser.id === userId;
    const isOwner = currentUser.permission === "Owner";

    const hasPermission = (isOwn && !isOwner) || (!isOwn && isOwner);

    return (
      <>
        <Button color="primary" icon={<Group />} label="グループ" to={`/users/${userId}/groups`} />
        <Button icon={<Notifications />} label="フォロー" to={`/users/${userId}/follow`} />
        <Button icon={<WbIncandescent />} label="提案" to={`/users/${userId}/suggestions`} />
        <Button icon={<ThumbsUpDown />} label="評価" to={`/users/${userId}/votes`} />
        {hasPermission && (
          <Button icon={<Report />} label="報告" to={`/users/${userId}/reports${isOwner ? "" : "/uploaded"}`} />
        )}
        {hasPermission && <Button icon={<SmsFailed />} label="抗議" to={`/users/${userId}/objections`} />}
      </>
    );
  })
);
