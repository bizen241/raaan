import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { ReportBufferList } from "../../lists/reports/ReportBufferList";

export const EditReportsPage = createPage()(
  React.memo(({ t }) => t("未保存の報告")),
  React.memo(() => {
    return <ReportBufferList />;
  })
);
