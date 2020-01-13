import { ThumbDown, ThumbUp } from "@material-ui/icons";
import React from "react";
import { PageProps } from "../../project/Router";
import { Button, Page } from "../../ui";

export const UserVotesPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  return (
    <Page title="評価履歴">
      <Button icon={<ThumbUp />} label="高評価" to={`/users/${userId}/votes/up`} />
      <Button icon={<ThumbDown />} label="低評価" to={`/users/${userId}/votes/down`} />
    </Page>
  );
});
