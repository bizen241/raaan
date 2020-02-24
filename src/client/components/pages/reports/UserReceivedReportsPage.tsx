import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { ReportSummaryList } from "../../lists/report-summaries/ReportSummaryList";

export const UserReceivedReportsPage = createPage<"User">()(
  React.memo(({ t }) => t("受信した報告")),
  React.memo(({ entityId: userId }) => {
    return (
      <ReportSummaryList
        initialParams={{
          targetType: "User",
          targetId: userId
        }}
      />
    );
  })
);
