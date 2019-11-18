import * as React from "react";
import { ContestEditor } from "../../editor/ContestEditor";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const EditContestPage = React.memo<PageProps>(({ match }) => {
  const groupId = match.params.id;

  return (
    <Page title="グループを編集中">
      <ContestEditor bufferId={groupId} />
    </Page>
  );
});
