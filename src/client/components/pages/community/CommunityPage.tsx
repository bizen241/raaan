import { Group, Person, Report, SmsFailed } from "@material-ui/icons";
import React, { useContext } from "react";
import { UserContext } from "../../project/Context";
import { Page } from "../../project/Page";
import { Button } from "../../ui";

export const CommunityPage = React.memo(() => {
  const currentUser = useContext(UserContext);

  const isOwner = currentUser.permission === "Owner";

  return (
    <Page title="コミュニティ">
      {isOwner && <Button icon={<Report />} label="報告一覧" to="/reports" />}
      {isOwner && <Button icon={<SmsFailed />} label="抗議一覧" to="/objections" />}
      <Button icon={<Person />} label="ユーザー" to="/users" />
      <Button icon={<Group />} label="グループ" to="/groups" />
    </Page>
  );
});
