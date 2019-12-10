import * as React from "react";
import { ObjectionEditor } from "../../editor/ObjectionEditor";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const EditObjectionPage = React.memo<PageProps>(({ match }) => {
  const objectionId = match.params.id;

  return (
    <Page title="抗議を編集中">
      <ObjectionEditor bufferId={objectionId} />
    </Page>
  );
});
