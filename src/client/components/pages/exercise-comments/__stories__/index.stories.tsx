import React from "react";
import { useEntities } from "../../../../hooks/useEntities";
import { decorator } from "../../../__stories__/helpers/decorator";
import { PageStory } from "../../__stories__/helpers/PageStory";

export default {
  title: "components/pages/exercise-comments",
  decorators: [decorator]
};

export const ExerciseExerciseComments = () => {
  const { entityIds: exerciseIds } = useEntities("Exercise");

  return <PageStory path={`/exercises/${exerciseIds[0]}/comments`} />;
};
