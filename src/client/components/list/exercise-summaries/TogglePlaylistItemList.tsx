import { Checkbox, TableCell, TableRow } from "@material-ui/core";
import * as React from "react";
import { createContext, useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import { ExerciseSummary, PlaylistItem } from "../../../../shared/api/entities";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useSearch } from "../../../hooks/useSearch";
import { useToggleState } from "../../../hooks/useToggleState";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { Column } from "../../ui";

export const PlaylistContext = createContext<string | undefined>(undefined);

export const TogglePlaylistItemList = createEntityList<ExerciseSummary>({ entityType: "ExerciseSummary" })(
  React.memo(({ entity: { exerciseId, title } }) => {
    const dispatch = useDispatch();
    const playlistId = useContext(PlaylistContext);
    if (playlistId === undefined) {
      return null;
    }

    const [isRequested, toggleRequestState] = useToggleState();

    const { entities: playlistItems } = useSearch<PlaylistItem>("PlaylistItem", {
      playlistId
    });
    const foundPlaylistItem = playlistItems.find(playlistItem => playlistItem.exerciseId === exerciseId);

    const onClick = useCallback(() => {
      toggleRequestState();

      if (foundPlaylistItem === undefined) {
        dispatch(
          actions.api.upload<PlaylistItem>(
            "PlaylistItem",
            generateBufferId(),
            {
              playlistId,
              exerciseId
            },
            uploadResponse => {
              dispatch(
                actions.cache.add<PlaylistItem>(
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
          <Column>{title || "無題"}</Column>
        </TableCell>
      </TableRow>
    );
  })
);
