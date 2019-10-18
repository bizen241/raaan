import { Checkbox, TableCell, TableRow } from "@material-ui/core";
import * as React from "react";
import { createContext, useCallback, useContext, useMemo } from "react";
import { useDispatch } from "react-redux";
import { PlaylistItem, PlaylistSummary } from "../../../shared/api/entities";
import { createEntityList } from "../../enhancers/createEntityList";
import { useEntity } from "../../hooks/useEntity";
import { actions } from "../../reducers";
import { generateBufferId } from "../../reducers/buffers";
import { Column } from "../ui";

export const ExerciseContext = createContext<string | undefined>(undefined);
export const PlaylistItemsContext = createContext<PlaylistItem[]>([]);

export const PlaylistSummarySelectList = createEntityList<PlaylistSummary>({ entityType: "PlaylistSummary" })(
  React.memo(({ entity: { playlistId, title } }) => {
    const dispatch = useDispatch();
    const exerciseId = useContext(ExerciseContext);
    const playlistItems = useContext(PlaylistItemsContext);
    if (exerciseId === undefined) {
      throw new Error("exerciseId is not defined.");
    }

    const bufferId = useMemo(() => generateBufferId(), []);
    const { uploadStatus } = useEntity<PlaylistItem>("PlaylistItem", bufferId);

    const onClick = useCallback(() => {
      dispatch(
        actions.api.upload<PlaylistItem>("PlaylistItem", bufferId, {
          playlistId,
          exerciseId
        })
      );
    }, []);

    const isAdded = playlistItems.some(playlistItem => playlistItem.playlistId === playlistId) || uploadStatus === 200;

    const isUploading = uploadStatus === 102;

    return (
      <TableRow hover onClick={!isUploading ? onClick : undefined}>
        <TableCell padding="checkbox">
          <Checkbox checked={isAdded} disabled={isUploading} />
        </TableCell>
        <TableCell>
          <Column>{title || "無題"}</Column>
        </TableCell>
      </TableRow>
    );
  })
);
