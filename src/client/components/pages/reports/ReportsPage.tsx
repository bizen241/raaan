import React from "react";
import { ReportSummaryList } from "../../lists/report-summaries/ReportSummaryList";
import { Page } from "../../project/Page";

export const ReportsPage = React.memo(() => {
  return (
    <Page title="報告一覧">
      <ReportSummaryList initialParams={{}} />
    </Page>
  );
});
