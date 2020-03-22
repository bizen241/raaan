import React from "react";
import { useEntity } from "../../../../hooks/useEntity";
import { useSearch } from "../../../../hooks/useSearch";
import { decorator } from "../../../__stories__/helpers/decorator";
import { PageStory } from "../../__stories__/helpers/PageStory";

export default {
  title: "components/pages/exercise-darfts",
  decorators: [decorator]
};

export const EditExerciseDraft = () => {
  const { entities } = useSearch("ExerciseSummary", {});
  const { entity: exercise } = useEntity("Exercise", entities[0].exerciseId);

  return <PageStory path={`/exercise-drafts/${exercise.draftId}/edit`} />;
};

export const EditExerciseDrafts = () => {
  return <PageStory path={`/exercise-drafts/edit`} />;
};

export const UserExerciseDrafts = () => {
  return <PageStory path={`/user/drafts`} />;
};
