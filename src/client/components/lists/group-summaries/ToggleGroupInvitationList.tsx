import { Checkbox, TableCell, TableRow, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useSearch } from "../../../hooks/useSearch";
import { useToggleState } from "../../../hooks/useToggleState";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";

export const ToggleGroupInvitationList = createEntityList<
  "GroupSummary",
  {
    followerId: EntityId<"User">;
  }
>("GroupSummary")(
  React.memo(({ entity: { groupId, name }, followerId }) => {
    const dispatch = useDispatch();
    const { currentUserId } = useCurrentUser();

    const [isRequested, toggleRequestState] = useToggleState();

    const { entities: followerInvitations } = useSearch(
      "GroupInvitation",
      {
        targetId: followerId,
        ownerId: currentUserId
      },
      false
    );

    const foundGroupInvitation = followerInvitations.find(groupInvitation => groupInvitation.groupId === groupId);

    const onClick = useCallback(() => {
      toggleRequestState();

      if (foundGroupInvitation === undefined) {
        dispatch(
          actions.api.upload(
            "GroupInvitation",
            generateBufferId(),
            {
              groupId,
              targetId: followerId
            },
            uploadResponse => {
              dispatch(
                actions.cache.add(
                  "GroupInvitation",
                  {
                    targetId: followerId,
                    ownerId: currentUserId
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
