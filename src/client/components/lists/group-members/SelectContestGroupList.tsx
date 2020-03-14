import { Divider, Typography } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import { push } from "connected-react-router";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { EntityId, GroupMember } from "../../../../shared/api/entities";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useEntity } from "../../../hooks/useEntity";
import { useSearch } from "../../../hooks/useSearch";
import { actions } from "../../../reducers";
import { generateLocalEntityId } from "../../../reducers/entity";
import { Card, Column, IconButton, Row, Table, TableRow } from "../../ui";

export const SelectContestGroupList = React.memo<{
  exerciseId: EntityId<"Exercise">;
}>(({ exerciseId }) => {
  const { currentUser } = useCurrentUser();
  const dispatch = useDispatch();

  const { entities: groupMembers, onReload } = useSearch("GroupMember", {
    userId: currentUser.id
  });
  const selectableGroups = groupMembers.filter(groupMember => groupMember.permission !== "read");

  const onSelect = useCallback((groupId: EntityId<"Group">) => {
    const bufferId = generateLocalEntityId<"Contest">();

    dispatch(
      actions.buffers.update("Contest", bufferId, {
        groupId,
        exerciseId,
        startAt: Date.now(),
        finishAt: Date.now() + 1000 * 60 * 60
      })
    );
    dispatch(push(`/contests/${bufferId}/edit`));
  }, []);

  return (
    <Card>
      <Column p={2}>
        <Row>
          <IconButton icon={Refresh} onClick={onReload} />
        </Row>
      </Column>
      <Divider />
      <Column pb={1}>
        <Table>
          {selectableGroups.map(groupMember => (
            <SelectContestGroupListItem key={groupMember.id} groupMember={groupMember} onSelect={onSelect} />
          ))}
        </Table>
      </Column>
    </Card>
  );
});

const SelectContestGroupListItem = React.memo<{
  groupMember: GroupMember;
  onSelect: (groupId: EntityId<"Group">) => void;
}>(({ groupMember, onSelect }) => {
  const { entity: groupSummary } = useEntity("GroupSummary", groupMember.groupSummaryId);

  return (
    <TableRow>
      <Column onClick={() => onSelect(groupSummary.groupId)}>
        <Typography>{groupSummary.name || "名無しのグループ"}</Typography>
      </Column>
    </TableRow>
  );
});
