import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { ExerciseViewer } from "../../viewers/ExerciseViewer";

export const ExercisePage = createPage<"Exercise">()(
  React.memo(({ t }) => t("問題集の詳細")),
  React.memo(({ entityId: exerciseId }) => {
    return <ExerciseViewer exerciseId={exerciseId} />;
  })
);
