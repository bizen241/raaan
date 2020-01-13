import React from "react";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";
import { ObjectionViewer } from "../../viewer/ObjectionViewer";

export const ObjectionPage = React.memo<PageProps>(props => {
  const objectionId = props.match.params.id;

  return (
    <Page title="抗議の詳細">
      <ObjectionViewer entityId={objectionId} />
    </Page>
  );
});
