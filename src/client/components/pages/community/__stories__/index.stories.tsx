import React from "react";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";
import { decorator } from "../../../__stories__/helpers/decorator";
import { PageStory } from "../../__stories__/helpers/PageStory";

export default {
  title: "components/pages/community",
  decorators: [decorator]
};

export const Community = () => {
  return <PageStory path="/app/community" />;
};

export const UserCommunity = () => {
  const { currentUser } = useCurrentUser();

  return <PageStory path={`/users/${currentUser.id}/community`} />;
};

export const UserFollow = () => {
  const { currentUser } = useCurrentUser();

  return <PageStory path={`/users/${currentUser.id}/follow`} />;
};

export const UserReports = () => {
  const { currentUser } = useCurrentUser();

  return <PageStory path={`/users/${currentUser.id}/reports`} />;
};

export const UserSuggestions = () => {
  const { currentUser } = useCurrentUser();

  return <PageStory path={`/users/${currentUser.id}/suggestions`} />;
};

export const UserVotes = () => {
  const { currentUser } = useCurrentUser();

  return <PageStory path={`/users/${currentUser.id}/votes`} />;
};
