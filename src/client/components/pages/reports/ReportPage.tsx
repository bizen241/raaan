import * as React from "react";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";
import { ReportViewer } from "../../viewer/ReportViewer";

export const ReportPage = React.memo<PageProps>(props => {
  const exerciseReportId = props.match.params.id;

  return (
    <Page title="クイズの報告の詳細">
      <ReportViewer entityId={exerciseReportId} />
    </Page>
  );
});
