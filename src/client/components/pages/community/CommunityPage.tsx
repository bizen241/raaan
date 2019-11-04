import { Group, Person, Report, SmsFailed } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { UserContext } from "../../project/Context";
import { Button, Page } from "../../ui";

export const CommunityPage = React.memo(() => {
  const currentUser = useContext(UserContext);

  const isOwner = currentUser.permission === "Owner";

  return (
    <Page title="コミュニティ">
      {isOwner && <Button color="primary" icon={<Report />} label="報告一覧" to="/community/reports" />}
      {isOwner && <Button color="primary" icon={<SmsFailed />} label="異議一覧" to="/community/objections" />}
      <Button icon={<Person />} label="ユーザー" to="/users" />
      <Button icon={<Group />} label="グループ" to="/groups" />
    </Page>
  );
});
