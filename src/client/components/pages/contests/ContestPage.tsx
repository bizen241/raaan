import React from "react";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { ContestViewer } from "../../viewers/ContestViewer";

export const ContestPage = React.memo<PageProps>(props => {
  const contestId = props.match.params.id;

  return (
    <Page title="セッションの詳細">
      <ContestViewer entityId={contestId} />
    </Page>
  );
});
