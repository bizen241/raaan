import { Box, TableCell, TableRow } from "@material-ui/core";
import * as React from "react";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { createEntityList } from ".";
import { PlaylistItem, PlaylistSummary } from "../../../../shared/api/entities";
import { useEntity } from "../../../hooks/entity";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";

export const PlaylistSummarySelectList = createEntityList<
  PlaylistSummary,
  {
    exerciseId: string;
  }
>(
  { entityType: "PlaylistSummary" },
  React.memo(({ entity: { playlistId, title }, exerciseId }) => {
    const dispatch = useDispatch();
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

    return (
      <TableRow hover onClick={onClick}>
        <TableCell>
          <Box display="flex" flexDirection="column">
            {uploadStatus || title || "無題"}
          </Box>
        </TableCell>
      </TableRow>
    );
  })
);
