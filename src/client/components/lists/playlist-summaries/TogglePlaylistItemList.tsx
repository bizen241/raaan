import { Checkbox, TableCell, TableRow } from "@material-ui/core";
import React, { createContext, useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useSearch } from "../../../hooks/useSearch";
import { useToggleState } from "../../../hooks/useToggleState";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { Column } from "../../ui";

export const ExerciseContext = createContext<string | undefined>(undefined);

export const TogglePlaylistItemList = createEntityList("PlaylistSummary")(
  React.memo(({ entity: { playlistId, title } }) => {
    const dispatch = useDispatch();
    const { currentUserId } = useCurrentUser();
    const exerciseId = useContext(ExerciseContext);
    if (exerciseId === undefined) {
      throw new Error("exerciseId is not defined");
    }

    const [isRequested, toggleRequestState] = useToggleState();

    const { entities: playlistItems } = useSearch("PlaylistItem", {
      authorId: currentUserId,
      exerciseId
    });
    const foundPlaylistItem = playlistItems.find(playlistItem => playlistItem.playlistId === playlistId);

    const onClick = useCallback(() => {
      toggleRequestState();

      if (foundPlaylistItem === undefined) {
        dispatch(
          actions.api.upload(
            "PlaylistItem",
            generateBufferId(),
            {
              playlistId,
              exerciseId
            },
            uploadResponse => {
              dispatch(
                actions.cache.add(
                  "PlaylistItem",
                  {
                    authorId: currentUserId,
                    exerciseId
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
