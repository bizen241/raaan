import React from "react";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { RevisionViewer } from "../../viewers/RevisionViewer";

export const RevisionPage = React.memo<PageProps>(props => {
  const revisionId = props.match.params.id;

  return (
    <Page title="編集履歴の詳細">
      <RevisionViewer entityId={revisionId} />
    </Page>
  );
});
