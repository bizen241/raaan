import React from "react";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";
import { useEntities } from "../../../../hooks/useEntities";
import { useEntity } from "../../../../hooks/useEntity";
import { useSearch } from "../../../../hooks/useSearch";
import { decorator } from "../../../__stories__/helpers/decorator";
import { PageStory } from "../../__stories__/helpers/PageStory";

export default {
  title: "components/pages/contests",
  decorators: [decorator]
};

export const Contest = () => {
  const { currentUser } = useCurrentUser();
  const { entities: groupMembers } = useSearch("GroupMember", {
    userId: currentUser.id
  });
  const { entity: groupSummary } = useEntity("GroupSummary", groupMembers[0].groupSummaryId);
  const { entities: contests } = useSearch("Contest", {
    groupId: groupSummary.groupId
  });

  return <PageStory path={`/contests/${contests[0].id}`} />;
};

export const EditContest = () => {
  const { entityIds: contestIds } = useEntities("Contest");

  return <PageStory path={`/contests/${contestIds[0]}/edit`} />;
};

export const EditContests = () => {
  return <PageStory path="/contests/edit" />;
};

export const GroupContests = () => {
  const { currentUser } = useCurrentUser();
  const { entities: groupMembers } = useSearch("GroupMember", {
    userId: currentUser.id
  });
  const { entity: groupSummary } = useEntity("GroupSummary", groupMembers[0].groupSummaryId);

  return <PageStory path={`/groups/${groupSummary.groupId}/contests`} />;
};
