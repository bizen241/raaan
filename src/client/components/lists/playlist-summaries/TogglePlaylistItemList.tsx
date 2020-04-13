import { Checkbox, TableCell, TableRow } from "@material-ui/core";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useSearch } from "../../../hooks/useSearch";
import { useToggleState } from "../../../hooks/useToggleState";
import { actions } from "../../../reducers";
import { generateLocalEntityId } from "../../../reducers/entity";
import { Column } from "../../ui";

export const TogglePlaylistItemList = createEntityList<
  "PlaylistSummary",
  {
    exerciseId: EntityId<"Exercise">;
  }
>("PlaylistSummary")(
  React.memo(({ entity: { playlistId, title }, exerciseId }) => {
    const dispatch = useDispatch();
    const { currentUser } = useCurrentUser();

    const [isRequested, toggleRequestState] = useToggleState();

    const { entities: playlistItems } = useSearch("PlaylistItem", {
      authorId: currentUser.id,
      exerciseId,
    });
    const foundPlaylistItem = playlistItems.find((playlistItem) => playlistItem.playlistId === playlistId);

    const onClick = useCallback(() => {
      toggleRequestState();

      if (foundPlaylistItem === undefined) {
        dispatch(
          actions.api.upload(
            "PlaylistItem",
            generateLocalEntityId(),
            {
              playlistId,
              exerciseId,
            },
            (uploadResponse) => {
              dispatch(
                actions.cache.add(
                  "PlaylistItem",
                  {
                    authorId: currentUser.id,
                    exerciseId,
                  },
                  uploadResponse
                )
              );
              toggleRequestState();
            }
          )
        );
      } else {
        dispatch(actions.api.delete("PlaylistItem", foundPlaylistItem.id, 0, toggleRequestState));
      }
    }, [playlistItems]);

    return (
      <TableRow hover onClick={!isRequested ? onClick : undefined}>
        <TableCell padding="checkbox">
          <Checkbox checked={foundPlaylistItem !== undefined} disabled={isRequested} />
        </TableCell>
        <TableCell>
          <Column>{title || "無題"}</Column>
        </TableCell>
      </TableRow>
    );
  })
);
