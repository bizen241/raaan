import * as React from "react";
import { ReportEditor } from "../../editor/ReportEditor";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const EditReportPage = React.memo<PageProps>(({ match }) => {
  const reportId = match.params.id;

  return (
    <Page title="報告を編集中">
      <ReportEditor bufferId={reportId} />
    </Page>
  );
});
