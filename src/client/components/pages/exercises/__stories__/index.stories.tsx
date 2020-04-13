import React from "react";
import { decorator } from "../../../__stories__/helpers/decorator";
import { PageStory } from "../../__stories__/helpers/PageStory";

export default {
  title: "components/pages/exercises",
  decorators: [decorator],
};

export const ExercisesPage = () => {
  return <PageStory path={`/exercises`} />;
};
