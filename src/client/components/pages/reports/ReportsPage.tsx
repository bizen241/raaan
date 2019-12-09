import * as React from "react";
import { ReportList } from "../../list/reports/ReportList";
import { Page } from "../../ui";

export const ReportsPage = React.memo(() => {
  return (
    <Page title="報告一覧">
      <ReportList initialParams={{}} />
    </Page>
  );
});
