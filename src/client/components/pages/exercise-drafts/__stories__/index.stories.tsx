import React from "react";
import { decorator } from "../../../__stories__/helpers/decorator";
import { getCacheId } from "../../../__stories__/helpers/Entities";
import { PageStory } from "../../__stories__/helpers/PageStory";

export default {
  title: "components/pages/exercise-darfts",
  decorators: [decorator],
};

export const EditExerciseDraft = () => {
  return <PageStory path={`/exercise-drafts/${getCacheId(0)}/edit`} />;
};

export const EditExerciseDrafts = () => {
  return <PageStory path={`/exercise-drafts/edit`} />;
};

export const UserExerciseDrafts = () => {
  return <PageStory path={`/user/drafts`} />;
};
