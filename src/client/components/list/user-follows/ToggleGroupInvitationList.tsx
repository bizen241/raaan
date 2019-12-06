import { Checkbox, TableCell, TableRow, Typography } from "@material-ui/core";
import { createContext, useCallback, useContext } from "react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { useSearch } from "../../../hooks/useSearch";
import { useToggleState } from "../../../hooks/useToggleState";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { Column } from "../../ui";

export const GroupContext = createContext<string | undefined>(undefined);

export const ToggleGroupInvitationList = createEntityList("UserFollow")(
  React.memo(({ entity: { followerSummaryId } }) => {
    const dispatch = useDispatch();
    const groupId = useContext(GroupContext);
    if (groupId === undefined) {
      return null;
    }

    const [isRequested, toggleRequestState] = useToggleState();

    const { entity: userSummary } = useEntity("UserSummary", followerSummaryId);
    const followerId = userSummary && userSummary.userId;

    const { entities: groupInvitations } = useSearch("GroupInvitation", {
      groupId
    });
    const foundGroupInvitation = groupInvitations.find(
      groupInvitation => groupInvitation.targetSummaryId === followerSummaryId
    );

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
      <TableRow hover onClick={followerId && !isRequested ? onClick : undefined}>
        <TableCell padding="checkbox">
          <Checkbox checked={foundGroupInvitation !== undefined} disabled={isRequested} />
        </TableCell>
        <TableCell>
          <Column>
            <Typography>{(userSummary && userSummary.name) || "名無しさん"}</Typography>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
