import { Checkbox, TableCell, TableRow } from "@material-ui/core";
import { createContext, useCallback, useContext } from "react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { GroupInvitation, UserFollow } from "../../../../shared/api/entities";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useSearch } from "../../../hooks/useSearch";
import { useToggleState } from "../../../hooks/useToggleState";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { Column } from "../../ui";

export const GroupContext = createContext<string | undefined>(undefined);

export const ToggleGroupInvitationList = createEntityList<UserFollow>({ entityType: "UserFollow" })(
  React.memo(({ entity: { followerId } }) => {
    const dispatch = useDispatch();
    const groupId = useContext(GroupContext);
    if (groupId === undefined) {
      return null;
    }

    const [isRequested, toggleRequestState] = useToggleState();

    const { entities: groupInvitations } = useSearch<GroupInvitation>("GroupInvitation", {
      groupId
    });
    const foundGroupInvitation = groupInvitations.find(groupInvitation => groupInvitation.targetId === followerId);

    const onClick = useCallback(() => {
      toggleRequestState();

      if (foundGroupInvitation === undefined) {
        dispatch(
          actions.api.upload<GroupInvitation>(
            "GroupInvitation",
            generateBufferId(),
            {
              groupId,
              targetId: followerId
            },
            uploadResponse => {
              dispatch(
                actions.cache.add<GroupInvitation>(
                  "GroupInvitation",
                  {
                    groupId
                  },
                  uploadResponse
                )
              );
              toggleRequestState();
            }
          )
        );
      } else {
        dispatch(actions.api.delete("GroupInvitation", foundGroupInvitation.id, 0, toggleRequestState));
      }
    }, [groupInvitations]);

    return (
      <TableRow hover onClick={!isRequested ? onClick : undefined}>
        <TableCell padding="checkbox">
          <Checkbox checked={foundGroupInvitation !== undefined} disabled={isRequested} />
        </TableCell>
        <TableCell>
          <Column>{followerId}</Column>
        </TableCell>
      </TableRow>
    );
  })
);
