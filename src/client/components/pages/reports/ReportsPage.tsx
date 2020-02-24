import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { ReportSummaryList } from "../../lists/report-summaries/ReportSummaryList";

export const ReportsPage = createPage()(
  React.memo(({ t }) => t("報告一覧")),
  React.memo(() => {
    return <ReportSummaryList initialParams={{}} />;
  })
);
