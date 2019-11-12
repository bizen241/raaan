import { Checkbox, TableCell, TableRow, Typography } from "@material-ui/core";
import { createContext, useCallback, useContext } from "react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { GroupInvitation, GroupSummary } from "../../../../shared/api/entities";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useToggleState } from "../../../hooks/useToggleState";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { UserContext } from "../../project/Context";

export const ExerciseContext = createContext<string | undefined>(undefined);

export const ToggleGroupInvitationList = createEntityList<
  GroupSummary,
  {
    followerId: string;
    followerInvitations: GroupInvitation[];
  }
>({ entityType: "GroupSummary" })(
  React.memo(({ entity: { groupId, name }, followerId, followerInvitations }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const [isRequested, toggleRequestState] = useToggleState();

    const foundGroupInvitation = followerInvitations.find(groupInvitation => groupInvitation.groupId === groupId);

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
                    targetId: followerId,
                    ownerId: currentUser.id
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
    }, [followerInvitations]);

    return (
      <TableRow hover onClick={groupId && !isRequested ? onClick : undefined}>
        <TableCell padding="checkbox">
          <Checkbox checked={foundGroupInvitation !== undefined} disabled={groupId === undefined || isRequested} />
        </TableCell>
        <TableCell>
          <Typography>{name || "名無しのグループ"}</Typography>
        </TableCell>
      </TableRow>
    );
  })
);
