import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { ReportSummaryList } from "../../lists/report-summaries/ReportSummaryList";

export const UserUploadedReportsPage = createPage<"User">()(
  React.memo(({ t }) => t("送信した報告")),
  React.memo(({ entityId: userId }) => {
    return (
      <ReportSummaryList
        initialParams={{
          reporterId: userId
        }}
      />
    );
  })
);
