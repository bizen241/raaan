import { useContext } from "react";
import { GroupMember, GroupMemberPermission } from "../../shared/api/entities";
import { UserContext } from "../components/project/Context";
import { useSearch } from "./useSearch";

export const useGroupMemberPermission = (groupId: string): GroupMemberPermission => {
  const currentUser = useContext(UserContext);

  const { entities: groupMembers } = useSearch<GroupMember>("GroupMember", {
    groupId,
    userId: currentUser.id
  });
  const groupMember = groupMembers[0];

  return groupMember !== undefined ? groupMember.permission : "guest";
};
