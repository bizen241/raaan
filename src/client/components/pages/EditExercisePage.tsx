import * as React from "react";
import { Exercise } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { isLocalOnly } from "../../reducers/api";
import { ExerciseDraftEditor } from "../editor/ExerciseEditor";
import { PageProps } from "../project/Router";
import { Page } from "../ui/Page";

const EditExercisePage = React.memo<PageProps>(({ match }) => {
  const bufferId = match.params.id;

  return (
    <Page title="クイズを編集中">
      {isLocalOnly(bufferId) ? (
        <ExerciseDraftEditor bufferId={bufferId} />
      ) : (
        <EditExercisePageContent entityId={bufferId} />
      )}
    </Page>
  );
});

const EditExercisePageContent = withEntity<Exercise>({
  entityType: "Exercise"
})(
  React.memo(({ entity: exercise }) => {
    return <ExerciseDraftEditor bufferId={exercise.draftId} />;
  })
);

export default EditExercisePage;
