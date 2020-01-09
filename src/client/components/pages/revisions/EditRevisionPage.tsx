import * as React from "react";
import { RevisionEditor } from "../../editor/RevisionEditor";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const EditRevisionPage = React.memo<PageProps>(({ match }) => {
  const reportId = match.params.id;

  return (
    <Page title="編集履歴を編集中">
      <RevisionEditor bufferId={reportId} />
    </Page>
  );
});
