import React from "react";
import { ReportEditor } from "../../editors/ReportEditor";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const EditReportPage = React.memo<PageProps>(({ match }) => {
  const reportId = match.params.id;

  return (
    <Page title="報告を編集中">
      <ReportEditor bufferId={reportId} />
    </Page>
  );
});
