import React from "react";
import { ReportBufferList } from "../../lists/reports/ReportBufferList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const EditReportsPage = React.memo<PageProps>(() => {
  return (
    <Page title="未保存の報告">
      <ReportBufferList />
    </Page>
  );
});
