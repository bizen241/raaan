import { Checkbox, TableCell, TableRow } from "@material-ui/core";
import { createContext, useCallback, useContext } from "react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { PlaylistItem, PlaylistSummary } from "../../../../shared/api/entities";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useSearch } from "../../../hooks/useSearch";
import { useToggleState } from "../../../hooks/useToggleState";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { UserContext } from "../../project/Context";
import { Column } from "../../ui";

export const ExerciseContext = createContext<string | undefined>(undefined);

export const TogglePlaylistItemList = createEntityList<PlaylistSummary>({ entityType: "PlaylistSummary" })(
  React.memo(({ entity: { playlistId, title } }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);
    const exerciseId = useContext(ExerciseContext);
    if (exerciseId === undefined) {
      return null;
    }

    const [isRequested, toggleRequestState] = useToggleState();

    const { entities: playlistItems } = useSearch<PlaylistItem>("PlaylistItem", {
      authorId: currentUser.id,
      exerciseId
    });
    const foundPlaylistItem = playlistItems.find(playlistItem => playlistItem.playlistId === playlistId);

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
                    authorId: currentUser.id,
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
