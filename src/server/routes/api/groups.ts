import { v4 as uuid } from "uuid";
import { createPostOperation } from "../../api/operation";
import { GroupEntity, GroupMemberEntity, GroupSecretEntity, GroupSummaryEntity } from "../../database/entities";

export const POST = createPostOperation("Group", "Write", async ({ currentUser, manager, params }) => {
  const { name = "", description = "" } = params;

  const groupSummary = new GroupSummaryEntity();
  const groupSecret = new GroupSecretEntity(uuid(), new Date());

  const group = new GroupEntity(currentUser, groupSummary, groupSecret, name);
  group.description = description;
  await manager.save(group);

  const groupOwner = new GroupMemberEntity(group, currentUser);
  groupOwner.permission = "owner";
  await manager.save(groupOwner);

  return [group, groupOwner];
});
