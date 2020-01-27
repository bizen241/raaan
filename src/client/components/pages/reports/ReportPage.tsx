import React from "react";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { ReportViewer } from "../../viewers/ReportViewer";

export const ReportPage = React.memo<PageProps>(props => {
  const reportId = props.match.params.id;

  return (
    <Page title="報告の詳細">
      <ReportViewer entityId={reportId} />
    </Page>
  );
});
