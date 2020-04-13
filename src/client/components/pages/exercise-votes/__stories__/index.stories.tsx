import React from "react";
import { decorator } from "../../../__stories__/helpers/decorator";
import { getCacheId } from "../../../__stories__/helpers/Entities";
import { PageStory } from "../../__stories__/helpers/PageStory";

export default {
  title: "components/pages/exercise-votes",
  decorators: [decorator],
};

export const UserDownVotes = () => {
  return <PageStory path={`/users/${getCacheId(0)}/votes/down`} />;
};

export const UserUpVotes = () => {
  return <PageStory path={`/users/${getCacheId(0)}/votes/up`} />;
};
