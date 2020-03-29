import React from "react";
import { decorator } from "../../../__stories__/helpers/decorator";
import { getCacheId } from "../../../__stories__/helpers/Entities";
import { PageStory } from "../../__stories__/helpers/PageStory";

export default {
  title: "components/pages/community",
  decorators: [decorator]
};

export const Community = () => {
  return <PageStory path="/app/community" />;
};

export const UserCommunity = () => {
  return <PageStory path={`/users/${getCacheId(0)}/community`} />;
};

export const UserFollow = () => {
  return <PageStory path={`/users/${getCacheId(0)}/follow`} />;
};

export const UserReports = () => {
  return <PageStory path={`/users/${getCacheId(0)}/reports`} />;
};

export const UserSuggestions = () => {
  return <PageStory path={`/users/${getCacheId(0)}/suggestions`} />;
};

export const UserVotes = () => {
  return <PageStory path={`/users/${getCacheId(0)}/votes`} />;
};
