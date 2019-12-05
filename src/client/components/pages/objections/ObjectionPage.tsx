import * as React from "react";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";
import { ObjectionViewer } from "../../viewer/ObjectionViewer";

export const ObjectionPage = React.memo<PageProps>(props => {
  const exerciseObjectionId = props.match.params.id;

  return (
    <Page title="異議の詳細">
      <ObjectionViewer entityId={exerciseObjectionId} />
    </Page>
  );
});
