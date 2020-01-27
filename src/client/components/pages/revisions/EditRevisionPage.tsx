import React from "react";
import { RevisionEditor } from "../../editors/RevisionEditor";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const EditRevisionPage = React.memo<PageProps>(({ match }) => {
  const reportId = match.params.id;

  return (
    <Page title="編集履歴を編集中">
      <RevisionEditor bufferId={reportId} />
    </Page>
  );
});
