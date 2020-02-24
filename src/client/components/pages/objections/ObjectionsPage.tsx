import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { ObjectionSummaryList } from "../../lists/objection-summaries/ObjectionSummaryList";

export const ObjectionsPage = createPage()(
  React.memo(({ t }) => t("抗議一覧")),
  React.memo(() => {
    return <ObjectionSummaryList initialParams={{}} />;
  })
);
