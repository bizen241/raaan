import React from "react";
import { ObjectionSummaryList } from "../../lists/objection-summaries/ObjectionSummaryList";
import { Page } from "../../project/Page";

export const ObjectionsPage = React.memo(() => {
  return (
    <Page title="抗議一覧">
      <ObjectionSummaryList initialParams={{}} />
    </Page>
  );
});
