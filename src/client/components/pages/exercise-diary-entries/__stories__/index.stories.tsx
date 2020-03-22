import React from "react";
import { useEntities } from "../../../../hooks/useEntities";
import { decorator } from "../../../__stories__/helpers/decorator";
import { PageStory } from "../../__stories__/helpers/PageStory";

export default {
  title: "components/pages/exercise-diary-entries",
  decorators: [decorator]
};

export const ExerciseDiary = () => {
  const { entityIds: exerciseIds } = useEntities("Exercise");

  return <PageStory path={`/exercises/${exerciseIds[0]}/diary`} />;
};
