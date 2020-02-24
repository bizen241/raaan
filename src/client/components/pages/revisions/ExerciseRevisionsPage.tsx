import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { RevisionSummaryList } from "../../lists/revision-summaries/RevisionSummaryList";

export const ExerciseRevisionsPage = createPage<"Exercise">()(
  React.memo(({ t }) => t("編集履歴")),
  React.memo(({ entityId: exerciseId }) => {
    return (
      <RevisionSummaryList
        initialParams={{
          exerciseId,
          searchSort: "createdAt",
          searchOrder: "DESC"
        }}
      />
    );
  })
);
