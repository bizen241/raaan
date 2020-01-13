import React from "react";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";
import { SynonymViewer } from "../../viewer/SynonymViewer";

export const SynonymPage = React.memo<PageProps>(props => {
  const synonymId = props.match.params.id;

  return (
    <Page title="タグの別名の詳細">
      <SynonymViewer entityId={synonymId} />
    </Page>
  );
});
