import { Event, Keyboard, Person } from "@material-ui/icons";
import React from "react";
import { EntityId } from "../../../shared/api/entities";
import { useEntity } from "../../hooks/useEntity";
import { Button, Column } from "../ui";
import { GroupSummaryViewer } from "./GroupSummaryViewer";

export const GroupViewer = React.memo<{
  groupId: EntityId<"Group">;
}>(({ groupId }) => {
  const { entity: group } = useEntity("Group", groupId);

  return (
    <Column>
      <Button icon={<Keyboard />} label="問題集" to={`/groups/${group.id}/exercises`} />
      <Button icon={<Event />} label="セッション" to={`/groups/${group.id}/contests`} />
      <Button icon={<Person />} label="メンバー" to={`/groups/${group.id}/members`} />
      <GroupSummaryViewer groupSummaryId={group.summaryId} />
    </Column>
  );
});
