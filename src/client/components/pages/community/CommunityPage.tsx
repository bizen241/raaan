import { Group, Person, Report, SmsFailed } from "@material-ui/icons";
import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { Button } from "../../ui";

export const CommunityPage = createPage()(
  React.memo(({ t }) => t("コミュニティ")),
  React.memo(() => {
    const { currentUser } = useCurrentUser();

    const isOwner = currentUser.permission === "Owner";

    return (
      <>
        {isOwner && <Button icon={<Report />} label="報告一覧" to="/reports" />}
        {isOwner && <Button icon={<SmsFailed />} label="抗議一覧" to="/objections" />}
        <Button icon={<Person />} label="ユーザー" to="/users" />
        <Button icon={<Group />} label="グループ" to="/groups" />
      </>
    );
  })
);
