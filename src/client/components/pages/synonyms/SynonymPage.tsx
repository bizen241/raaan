import React from "react";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { SynonymViewer } from "../../viewers/SynonymViewer";

export const SynonymPage = React.memo<PageProps>(props => {
  const synonymId = props.match.params.id;

  return (
    <Page title="タグの別名の詳細">
      <SynonymViewer entityId={synonymId} />
    </Page>
  );
});
