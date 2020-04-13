import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { ObjectionSummaryList } from "../../lists/objection-summaries/ObjectionSummaryList";

export const UserObjectionsPage = createPage<"User">()(
  React.memo(({ t }) => t("ユーザーの抗議一覧")),
  React.memo(({ entityId: userId }) => {
    return (
      <ObjectionSummaryList
        initialParams={{
          objectorId: userId,
        }}
      />
    );
  })
);
