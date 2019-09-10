import { Box, Button, TextField, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { createDialog, DialogContent, DialogHeader, useToggleState } from ".";
import { Playlist } from "../../../shared/api/entities";
import { useEntity } from "../../hooks/entity";
import { actions } from "../../reducers";
import { generateBufferId } from "../../reducers/buffers";
import { PlaylistSummarySelectList } from "../list/search/PlaylistSummarySelectList";
import { UserContext } from "../project/Context";
import { useStyles } from "../ui/styles";

export const PlaylistDialog = createDialog<{
  exerciseId: string;
}>(
  React.memo(({ exerciseId, onClose }) => {
    const classes = useStyles();
    const currentUser = useContext(UserContext);
    const dispatch = useDispatch();

    const bufferId = useMemo(() => generateBufferId(), []);
    const [title, setTitle] = useState();
    const [isPlaylistEditorOpen, onTogglePlaylistEditor] = useToggleState();

    const { uploadStatus } = useEntity<Playlist>("Playlist", bufferId);

    const onUpdateTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    }, []);
    const onUploadPlaylist = () => {
      dispatch(
        actions.api.upload<Playlist>("Playlist", bufferId, {
          title,
          exerciseId
        })
      );
    };

    console.log(uploadStatus);

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>プレイリストに追加</Typography>
        </DialogHeader>
        <DialogContent>
          {!isPlaylistEditorOpen ? (
            <>
              <Box display="flex" flexDirection="column" pb={1}>
                <Button className={classes.largeButton} variant="contained" onClick={onTogglePlaylistEditor}>
                  <Add className={classes.leftIcon} />
                  <Typography>新規作成</Typography>
                </Button>
              </Box>
              <Box display="flex" flexDirection="column" pb={1}>
                <PlaylistSummarySelectList
                  title="プレイリスト一覧"
                  initialSearchParams={{
                    authorId: currentUser.id
                  }}
                  exerciseId={exerciseId}
                />
              </Box>
            </>
          ) : (
            <>
              <Box display="flex" flexDirection="column" pb={1}>
                <Box display="flex" flexDirection="column" component="label">
                  <Typography color="textSecondary">題名</Typography>
                  <TextField variant="outlined" defaultValue={"新しいプレイリスト"} onChange={onUpdateTitle} />
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" pb={1}>
                <Button className={classes.largeButton} variant="contained" onClick={onUploadPlaylist}>
                  <Typography>プレイリストを作成</Typography>
                </Button>
              </Box>
              <Box display="flex" flexDirection="column" pb={1}>
                <Button className={classes.largeButton} variant="contained" onClick={onTogglePlaylistEditor}>
                  <Typography color="error">キャンセル</Typography>
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </>
    );
  })
);
