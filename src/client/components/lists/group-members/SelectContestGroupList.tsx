import { Divider, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import { push } from "connected-react-router";
import React, { useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import { GroupMember } from "../../../../shared/api/entities";
import { useEntity } from "../../../hooks/useEntity";
import { useSearch } from "../../../hooks/useSearch";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { UserContext } from "../../project/Context";
import { Card, Column, IconButton, Row } from "../../ui";

export const SelectContestGroupList = React.memo<{
  exerciseId: string;
}>(({ exerciseId }) => {
  const currentUser = useContext(UserContext);
  const dispatch = useDispatch();

  const { entities: groupMembers, onReload } = useSearch("GroupMember", {
    userId: currentUser.id
  });
  const selectableGroups = groupMembers.filter(groupMember => groupMember.permission !== "read");

  const onSelect = useCallback((groupId: string) => {
    const bufferId = generateBufferId();

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
          <TableBody>
            {selectableGroups.map(groupMember => (
              <SelectContestGroupListItem
                key={groupMember.id}
                groupMember={groupMember}
                onSelect={onSelect}
                onReload={onReload}
              />
            ))}
          </TableBody>
        </Table>
      </Column>
    </Card>
  );
});

const SelectContestGroupListItem = React.memo<{
  groupMember: GroupMember;
  onSelect: (groupId: string) => void;
  onReload: () => void;
}>(({ groupMember, onSelect, onReload }) => {
  const { entity: groupSummary } = useEntity("GroupSummary", groupMember.groupSummaryId);
  if (groupSummary === undefined) {
    return (
      <Column>
        <IconButton icon={Refresh} onClick={onReload} />
      </Column>
    );
  }

  return (
    <TableRow hover onClick={() => onSelect(groupSummary.groupId)}>
      <TableCell>
        <Column>
          <Typography>{groupSummary.name || "名無しのグループ"}</Typography>
        </Column>
      </TableCell>
    </TableRow>
  );
});
