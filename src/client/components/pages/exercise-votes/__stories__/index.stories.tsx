import React from "react";
import { useEntities } from "../../../../hooks/useEntities";
import { decorator } from "../../../__stories__/helpers/decorator";
import { PageStory } from "../../__stories__/helpers/PageStory";

export default {
  title: "components/pages/exercise-votes",
  decorators: [decorator]
};

export const UserDownVotes = () => {
  const { entityIds: userIds } = useEntities("User");

  return <PageStory path={`/users/${userIds[0]}/votes/down`} />;
};

export const UserUpVotes = () => {
  const { entityIds: userIds } = useEntities("User");

  return <PageStory path={`/users/${userIds[0]}/votes/up`} />;
};
