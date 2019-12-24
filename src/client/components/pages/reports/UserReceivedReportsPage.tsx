import * as React from "react";
import { ReportList } from "../../list/reports/ReportList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";

export const UserReceivedReportsPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  return (
    <Page title="受信した報告">
      <ReportList
        initialParams={{
          targetType: "User",
          targetId: userId
        }}
      />
    </Page>
  );
});
