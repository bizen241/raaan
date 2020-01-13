import { Add, Edit } from "@material-ui/icons";
import React from "react";
import { ContestList } from "../../list/contests/ContestList";
import { PageProps } from "../../project/Router";
import { Button, Page } from "../../ui";

export const GroupContestsPage = React.memo<PageProps>(({ match }) => {
  const groupId = match.params.id;

  return (
    <Page title="グループのセッション">
      <Button icon={<Add />} label="新しいセッションを作る" />
      <Button icon={<Edit />} label="編集中のセッション" to="/contests/edit" />
      <ContestList
        initialParams={{
          groupId
        }}
      />
    </Page>
  );
});
