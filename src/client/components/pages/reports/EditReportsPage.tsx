import * as React from "react";
import { ReportBufferList } from "../../list/reports/ReportBufferList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const EditReportsPage = React.memo<PageProps>(() => {
  return (
    <Page title="未保存の報告">
      <ReportBufferList />
    </Page>
  );
});
