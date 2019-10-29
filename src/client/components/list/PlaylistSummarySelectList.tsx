import { Checkbox, TableCell, TableRow } from "@material-ui/core";
import { createContext, useCallback, useContext } from "react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { PlaylistItem, PlaylistSummary } from "../../../shared/api/entities";
import { createEntityList } from "../../enhancers/createEntityList";
import { useSearch } from "../../hooks/useSearch";
import { useToggleState } from "../../hooks/useToggleState";
import { actions } from "../../reducers";
import { generateBufferId } from "../../reducers/buffers";
import { UserContext } from "../project/Context";
import { Column } from "../ui";

export const ExerciseContext = createContext<string | undefined>(undefined);

export const PlaylistSummarySelectList = createEntityList<PlaylistSummary>({ entityType: "PlaylistSummary" })(
  React.memo(({ entity: { playlistId, title } }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);
    const exerciseId = useContext(ExerciseContext);
    if (exerciseId === undefined) {
      return null;
    }

    const [isRequested, toggleRequestState] = useToggleState();

    const { entities: playlistItems, onReload: onReloadPlaylistItems } = useSearch<PlaylistItem>("PlaylistItem", {
      authorId: currentUser.id,
      exerciseId
    });
    const belongingItem = playlistItems.find(playlistItem => playlistItem.playlistId === playlistId);

    const onClick = useCallback(() => {
      toggleRequestState();

      if (belongingItem === undefined) {
        dispatch(
          actions.api.upload<PlaylistItem>(
            "PlaylistItem",
            generateBufferId(),
            {
              playlistId,
              exerciseId
            },
            () => {
              onReloadPlaylistItems();
              toggleRequestState();
            }
          )
        );
      } else {
        dispatch(actions.api.delete("PlaylistItem", belongingItem.id, 0, toggleRequestState));
      }
    }, [playlistItems]);

    return (
      <TableRow hover onClick={!isRequested ? onClick : undefined}>
        <TableCell padding="checkbox">
          <Checkbox checked={belongingItem !== undefined} disabled={isRequested} />
        </TableCell>
        <TableCell>
          <Column>{title || "無題"}</Column>
        </TableCell>
      </TableRow>
    );
  })
);
