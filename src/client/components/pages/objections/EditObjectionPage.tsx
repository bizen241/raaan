import React from "react";
import { ObjectionEditor } from "../../editors/ObjectionEditor";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const EditObjectionPage = React.memo<PageProps>(({ match }) => {
  const objectionId = match.params.id;

  return (
    <Page title="抗議を編集中">
      <ObjectionEditor bufferId={objectionId} />
    </Page>
  );
});
