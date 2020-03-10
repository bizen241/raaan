import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { ReportEditor } from "../../editors/ReportEditor";

export const EditReportPage = createPage<"Report">()(
  React.memo(({ t }) => t("報告を編集中")),
  React.memo(({ entityId: reportId }) => {
    return <ReportEditor reportId={reportId} />;
  })
);
