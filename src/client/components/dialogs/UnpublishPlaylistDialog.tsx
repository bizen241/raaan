import { Box, Button, Typography } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../enhancers/createDialog";
import { actions } from "../../reducers";
import { DialogContent, DialogHeader } from "../ui/Dialog";
import { useStyles } from "../ui/styles";

export const UnpublishPlaylistDialog = createDialog<{
  playlistId: string;
}>(
  React.memo(({ playlistId, onClose }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const onUnpublish = () => {
      dispatch(
        actions.api.upload("Playlist", playlistId, {
          isPrivate: true
        })
      );

      onClose();
    };

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>プレイリストの公開を終了</Typography>
        </DialogHeader>
        <DialogContent>
          <Box display="flex" alignItems="center" flex={1} pb={1}>
            <Warning className={classes.leftIcon} />
            <Typography>プレイリストが非公開に設定されます。</Typography>
          </Box>
          <Box display="flex" flexDirection="column" pb={1}>
            <Button className={classes.largeButton} variant="contained" onClick={onUnpublish}>
              <Typography color="error">プレイリストの公開を終了</Typography>
            </Button>
          </Box>
          <Box display="flex" flexDirection="column" pb={1}>
            <Button className={classes.largeButton} variant="contained" onClick={onClose}>
              <Typography>キャンセル</Typography>
            </Button>
          </Box>
        </DialogContent>
      </>
    );
  })
);
