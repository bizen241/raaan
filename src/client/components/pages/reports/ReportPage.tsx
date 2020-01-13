import React from "react";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";
import { ReportViewer } from "../../viewer/ReportViewer";

export const ReportPage = React.memo<PageProps>(props => {
  const reportId = props.match.params.id;

  return (
    <Page title="報告の詳細">
      <ReportViewer entityId={reportId} />
    </Page>
  );
});
