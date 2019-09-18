import { Box, IconButton, Link, TableCell, TableRow, Typography } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { PlaylistSummary } from "../../../shared/api/entities";
import { createEntityList } from "../../enhancers/createEntityList";
import { UserContext } from "../project/Context";

export const PlaylistSummaryList = createEntityList<PlaylistSummary>({ entityType: "PlaylistSummary" })(
  React.memo(({ entity: playlistSummary }) => {
    const currentUser = useContext(UserContext);

    return (
      <TableRow>
        <TableCell>
          <Box display="flex" flexDirection="column">
            <Link color="textPrimary" component={RouterLink} to={`/playlists/${playlistSummary.playlistId}`}>
              <Typography>{playlistSummary.title || "無題"}</Typography>
            </Link>
          </Box>
        </TableCell>
        {playlistSummary.authorId === currentUser.id ? (
          <TableCell padding="checkbox">
            <IconButton component={RouterLink} to={`/playlists/${playlistSummary.playlistId}/edit`}>
              <Edit />
            </IconButton>
          </TableCell>
        ) : null}
      </TableRow>
    );
  })
);
