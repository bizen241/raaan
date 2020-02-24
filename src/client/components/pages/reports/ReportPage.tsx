import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { ReportViewer } from "../../viewers/ReportViewer";

export const ReportPage = createPage<"Report">()(
  React.memo(({ t }) => t("報告の詳細")),
  React.memo(({ entityId: reportId }) => {
    return <ReportViewer entityId={reportId} />;
  })
);
