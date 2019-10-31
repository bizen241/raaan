import { Group, Person, Report, ThumbsUpDown } from "@material-ui/icons";
import * as React from "react";
import { Button, Page } from "../ui";

export const CommunityPage = React.memo(() => {
  return (
    <Page title="コミュニティ">
      <Button color="primary" icon={<Report />} label="報告履歴" to="/reports" />
      <Button color="primary" icon={<ThumbsUpDown />} label="評価履歴" to="/votes" />
      <Button icon={<Person />} label="ユーザー" to="/users" />
      <Button icon={<Group />} label="グループ" to="/groups" />
    </Page>
  );
});
