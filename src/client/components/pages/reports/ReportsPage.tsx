import * as React from "react";
import { ReportSummaryList } from "../../list/report-summaries/ReportSummaryList";
import { Page } from "../../ui";

export const ReportsPage = React.memo(() => {
  return (
    <Page title="報告一覧">
      <ReportSummaryList initialParams={{}} />
    </Page>
  );
});
