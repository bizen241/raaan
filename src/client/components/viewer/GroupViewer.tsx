import { Event, Keyboard, Person } from "@material-ui/icons";
import * as React from "react";
import { withEntity } from "../../enhancers/withEntity";
import { Button, Column } from "../ui";
import { GroupSummaryViewer } from "./GroupSummaryViewer";

export const GroupViewer = withEntity("Group")(({ entity: group }) => {
  return (
    <Column>
      <Button icon={<Keyboard />} label="クイズ" to={`/groups/${group.id}/contents/exercises`} />
      <Button icon={<Event />} label="セッション" to={`/groups/${group.id}/contents/contests`} />
      <Button icon={<Person />} label="メンバー" to={`/groups/${group.id}/members`} />
      <GroupSummaryViewer entityId={group.summaryId} />
    </Column>
  );
});
