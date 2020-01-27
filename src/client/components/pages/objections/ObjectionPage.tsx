import React from "react";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { ObjectionViewer } from "../../viewers/ObjectionViewer";

export const ObjectionPage = React.memo<PageProps>(props => {
  const objectionId = props.match.params.id;

  return (
    <Page title="抗議の詳細">
      <ObjectionViewer entityId={objectionId} />
    </Page>
  );
});
