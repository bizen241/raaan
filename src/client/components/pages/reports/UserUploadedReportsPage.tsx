import React from "react";
import { ReportSummaryList } from "../../lists/report-summaries/ReportSummaryList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const UserUploadedReportsPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  return (
    <Page title="送信した報告">
      <ReportSummaryList
        initialParams={{
          reporterId: userId
        }}
      />
    </Page>
  );
});
