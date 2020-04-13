import React from "react";
import { decorator } from "../../../__stories__/helpers/decorator";
import { getCacheId } from "../../../__stories__/helpers/Entities";
import { PageStory } from "../../__stories__/helpers/PageStory";

export default {
  title: "components/pages/contests",
  decorators: [decorator],
};

export const Contest = () => {
  return <PageStory path={`/contests/${getCacheId(0)}`} />;
};

export const EditContest = () => {
  return <PageStory path={`/contests/${getCacheId(0)}/edit`} />;
};

export const EditContests = () => {
  return <PageStory path="/contests/edit" />;
};

export const GroupContests = () => {
  return <PageStory path={`/groups/${getCacheId(0)}/contests`} />;
};
