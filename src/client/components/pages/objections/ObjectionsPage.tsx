import * as React from "react";
import { ObjectionSummaryList } from "../../list/objection-summaries/ObjectionSummaryList";
import { Page } from "../../ui";

export const ObjectionsPage = React.memo(() => {
  return (
    <Page title="抗議一覧">
      <ObjectionSummaryList initialParams={{}} />
    </Page>
  );
});
