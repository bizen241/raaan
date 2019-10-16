import { TextField, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Playlist } from "../../../shared/api/entities";
import { createDialog } from "../../enhancers/createDialog";
import { useEntity } from "../../hooks/useEntity";
import { useToggleState } from "../../hooks/useToggleState";
import { actions } from "../../reducers";
import { generateBufferId } from "../../reducers/buffers";
import { ExerciseContext, PlaylistSummarySelectList } from "../list/PlaylistSummarySelectList";
import { UserContext } from "../project/Context";
import { Button, Column, DialogContent, DialogHeader } from "../ui";

export const PlaylistDialog = createDialog<{
  exerciseId: string;
}>(
  React.memo(({ exerciseId, onClose }) => {
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

    useEffect(() => {
      if (uploadStatus === 200) {
        onClose();
      }
    }, [uploadStatus]);

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>プレイリストに追加</Typography>
        </DialogHeader>
        <DialogContent>
          {!isPlaylistEditorOpen ? (
            <>
              <Column pb={1}>
                <Button icon={<Add />} label="新規作成" onClick={onTogglePlaylistEditor} />
              </Column>
              <Column pb={1}>
                <ExerciseContext.Provider value={exerciseId}>
                  <PlaylistSummarySelectList
                    title="プレイリスト一覧"
                    initialParams={{
                      authorId: currentUser.id
                    }}
                  />
                </ExerciseContext.Provider>
              </Column>
            </>
          ) : (
            <>
              <Column pb={1}>
                <Column component="label">
                  <Typography color="textSecondary">題名</Typography>
                  <TextField variant="outlined" defaultValue={"新しいプレイリスト"} onChange={onUpdateTitle} />
                </Column>
              </Column>
              <Column pb={1}>
                <Button label="プレイリストを作成" onClick={onUploadPlaylist} />
              </Column>
              <Column pb={1}>
                <Button label="キャンセル" onClick={onTogglePlaylistEditor} />
              </Column>
            </>
          )}
        </DialogContent>
      </>
    );
  })
);
