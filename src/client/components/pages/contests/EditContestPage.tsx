import React from "react";
import { ContestEditor } from "../../editors/ContestEditor";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const EditContestPage = React.memo<PageProps>(({ match }) => {
  const groupId = match.params.id;

  return (
    <Page title="セッションを編集中">
      <ContestEditor bufferId={groupId} />
    </Page>
  );
});
