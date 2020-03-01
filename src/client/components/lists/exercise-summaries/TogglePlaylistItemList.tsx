import { Checkbox, TableCell, TableRow, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useSearch } from "../../../hooks/useSearch";
import { useToggleState } from "../../../hooks/useToggleState";
import { actions } from "../../../reducers";
import { generateLocalEntityId } from "../../../reducers/entity";
import { Column } from "../../ui";

export const TogglePlaylistItemList = createEntityList<
  "ExerciseSummary",
  {
    playlistId: EntityId<"Playlist">;
  }
>("ExerciseSummary")(
  React.memo(({ entity: { exerciseId, title }, playlistId }) => {
    const dispatch = useDispatch();

    const [isRequested, toggleRequestState] = useToggleState();

    const { entities: playlistItems } = useSearch("PlaylistItem", {
      playlistId
    });
    const foundPlaylistItem = playlistItems.find(playlistItem => playlistItem.exerciseId === exerciseId);

    const onClick = useCallback(() => {
      toggleRequestState();

      if (foundPlaylistItem === undefined) {
        dispatch(
          actions.api.upload(
            "PlaylistItem",
            generateLocalEntityId(),
            {
              playlistId,
              exerciseId
            },
            uploadResponse => {
              dispatch(
                actions.cache.add(
                  "PlaylistItem",
                  {
                    playlistId
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
          <Column>
            <Typography>{title || "無題"}</Typography>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
