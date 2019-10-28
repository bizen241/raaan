import { TextField, Typography } from "@material-ui/core";
import { Add, CloudUpload, PlaylistPlay } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Playlist, PlaylistItem } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useSearch } from "../../../hooks/useSearch";
import { useToggleState } from "../../../hooks/useToggleState";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { ExerciseContext, PlaylistItemsContext, PlaylistSummarySelectList } from "../../list/PlaylistSummarySelectList";
import { UserContext } from "../../project/Context";
import { Button, Card, Column, DialogContent } from "../../ui";

export const PlaylistDialog = createDialog<{
  exerciseId: string;
}>(
  React.memo(({ exerciseId, onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const { entities: playlistItems } = useSearch<PlaylistItem>("PlaylistItem", {
      authorId: currentUser.id,
      exerciseId
    });

    const [isPlaylistEditorOpen, onTogglePlaylistEditor] = useToggleState();
    const [title, setTitle] = useState();

    const onUpdateTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    }, []);
    const onUploadPlaylist = () => {
      const bufferId = generateBufferId();

      dispatch(
        actions.api.upload<Playlist>(
          "Playlist",
          bufferId,
          {
            title,
            exerciseId
          },
          onClose
        )
      );
    };

    return (
      <DialogContent title="プレイリストに追加" onClose={onClose}>
        {!isPlaylistEditorOpen ? (
          <>
            <Button icon={<Add />} label="新規作成" onClick={onTogglePlaylistEditor} />
            <Column pb={1}>
              <ExerciseContext.Provider value={exerciseId}>
                <PlaylistItemsContext.Provider value={playlistItems}>
                  <PlaylistSummarySelectList
                    title="プレイリスト一覧"
                    initialParams={{
                      authorId: currentUser.id
                    }}
                  />
                </PlaylistItemsContext.Provider>
              </ExerciseContext.Provider>
            </Column>
          </>
        ) : (
          <>
            <Card icon={<PlaylistPlay />} title="プレイリストを作る">
              <Column component="label">
                <Typography color="textSecondary">題名</Typography>
                <TextField variant="outlined" defaultValue={"新しいプレイリスト"} onChange={onUpdateTitle} />
              </Column>
            </Card>
            <Button icon={<CloudUpload />} label="プレイリストをアップロード" onClick={onUploadPlaylist} />
          </>
        )}
      </DialogContent>
    );
  })
);
