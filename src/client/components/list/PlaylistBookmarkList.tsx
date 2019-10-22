import { IconButton, TableCell, TableRow, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import { PlaylistBookmark } from "../../../shared/api/entities";
import { createEntityList } from "../../enhancers/createEntityList";
import { actions } from "../../reducers";
import { UserContext } from "../project/Context";
import { Column } from "../ui";

export const PlaylistBookmarkList = createEntityList<PlaylistBookmark>({
  entityType: "PlaylistBookmark",
  itemHeight: 77
})(
  React.memo(({ entity: playlistBookmark }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Typography>{playlistBookmark.playlistId}</Typography>
          </Column>
        </TableCell>
        <TableCell padding="checkbox">
          {playlistBookmark.userId === currentUser.id ? (
            <IconButton
              onClick={useCallback(() => dispatch(actions.api.delete("PlaylistBookmark", playlistBookmark.id)), [])}
            >
              <Delete />
            </IconButton>
          ) : null}
        </TableCell>
      </TableRow>
    );
  })
);
