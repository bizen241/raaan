import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { ExerciseDraftEditor } from "../../editors/ExerciseDraftEditor";

const EditExerciseDraftPage = createPage<"ExerciseDraft">()(
  React.memo(({ t }) => t("問題集を編集中")),
  React.memo(({ entityId: exerciseDraftId }) => {
    return <ExerciseDraftEditor exerciseDraftId={exerciseDraftId} />;
  })
);

export default EditExerciseDraftPage;
