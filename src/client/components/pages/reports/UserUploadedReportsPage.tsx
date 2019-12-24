import * as React from "react";
import { ReportList } from "../../list/reports/ReportList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";

export const UserUploadedReportsPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  return (
    <Page title="送信した報告">
      <ReportList
        initialParams={{
          reporterId: userId
        }}
      />
    </Page>
  );
});
