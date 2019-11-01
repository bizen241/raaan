import { Group, Report, ThumbsUpDown } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { UserContext } from "../project/Context";
import { PageProps } from "../project/Router";
import { Button, Page } from "../ui";

export const UserCommunityPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  const currentUser = useContext(UserContext);

  const isOwn = currentUser.id === userId;
  const isOwner = currentUser.permission === "Owner";

  return (
    <Page title="コミュニティ">
      <Button color="primary" icon={<Group />} label="グループ" to={`/users/${userId}/group-members`} />
      {(isOwn || isOwner) && <Button icon={<Report />} label="報告履歴" to={`/users/${userId}/reports`} />}
      <Button icon={<ThumbsUpDown />} label="評価履歴" to={`/users/${userId}/exercise-votes`} />
    </Page>
  );
});
