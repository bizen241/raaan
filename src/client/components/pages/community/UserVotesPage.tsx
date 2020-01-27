import { ThumbDown, ThumbUp } from "@material-ui/icons";
import React from "react";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { Button } from "../../ui";

export const UserVotesPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  return (
    <Page title="評価履歴">
      <Button icon={<ThumbUp />} label="高評価" to={`/users/${userId}/votes/up`} />
      <Button icon={<ThumbDown />} label="低評価" to={`/users/${userId}/votes/down`} />
    </Page>
  );
});
