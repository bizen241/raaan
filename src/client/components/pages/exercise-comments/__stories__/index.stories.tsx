import React from "react";
import { decorator } from "../../../__stories__/helpers/decorator";
import { getCacheId } from "../../../__stories__/helpers/Entities";
import { PageStory } from "../../__stories__/helpers/PageStory";

export default {
  title: "components/pages/exercise-comments",
  decorators: [decorator]
};

export const ExerciseExerciseComments = () => {
  return <PageStory path={`/exercises/${getCacheId(0)}/comments`} />;
};
