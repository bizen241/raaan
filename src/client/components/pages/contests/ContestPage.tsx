import React from "react";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";
import { ContestViewer } from "../../viewer/ContestViewer";

export const ContestPage = React.memo<PageProps>(props => {
  const contestId = props.match.params.id;

  return (
    <Page title="セッションの詳細">
      <ContestViewer entityId={contestId} />
    </Page>
  );
});
