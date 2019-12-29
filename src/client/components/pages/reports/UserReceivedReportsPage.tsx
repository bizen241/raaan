import * as React from "react";
import { ReportSummaryList } from "../../list/report-summaries/ReportSummaryList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";

export const UserReceivedReportsPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  return (
    <Page title="受信した報告">
      <ReportSummaryList
        initialParams={{
          targetType: "User",
          targetId: userId
        }}
      />
    </Page>
  );
});
