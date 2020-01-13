import React from "react";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";
import { RevisionViewer } from "../../viewer/RevisionViewer";

export const RevisionPage = React.memo<PageProps>(props => {
  const revisionId = props.match.params.id;

  return (
    <Page title="編集履歴の詳細">
      <RevisionViewer entityId={revisionId} />
    </Page>
  );
});
