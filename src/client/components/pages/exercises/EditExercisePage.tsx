import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { withEntity } from "../../../enhancers/withEntity";
import { isLocalOnly } from "../../../reducers/api";
import { ExerciseDraftEditor } from "../../editors/ExerciseDraftEditor";

const EditExercisePage = createPage<"Exercise">()(
  React.memo(({ t }) => t("問題集を編集中")),
  React.memo(({ entityId: exerciseBufferId }) => {
    return isLocalOnly(exerciseBufferId) ? (
      <ExerciseDraftEditor bufferId={exerciseBufferId} />
    ) : (
      <EditExercisePageContent entityId={exerciseBufferId} />
    );
  })
);

const EditExercisePageContent = withEntity("Exercise")(
  React.memo(({ entity: exercise }) => {
    return <ExerciseDraftEditor bufferId={exercise.draftId} />;
  })
);

export default EditExercisePage;
