import { TextField, Typography } from "@material-ui/core";
import { Add, CloudUpload, PlaylistPlay } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { useSearch } from "../../../hooks/useSearch";
import { useToggleState } from "../../../hooks/useToggleState";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { ExerciseContext, TogglePlaylistItemList } from "../../list/playlist-summaries/TogglePlaylistItemList";
import { UserContext } from "../../project/Context";
import { Button, Card, Column, DialogContent } from "../../ui";

export const PlaylistItemsDialog = createDialog<{
  exerciseId: string;
}>(
  React.memo(({ exerciseId, onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const [isEditoOpen, onToggleEditor] = useToggleState();
    const [title, setTitle] = useState();

    const { onReload: onReloadPlaylistSummaries } = useSearch("PlaylistSummary", {
      authorId: currentUser.id
    });
    const { onReload: onReloadPlaylistItems } = useSearch("PlaylistItem", {
      authorId: currentUser.id,
      exerciseId
    });

    const onUpdateTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    }, []);
    const onUploadPlaylist = () => {
      const bufferId = generateBufferId();

      dispatch(
        actions.api.upload(
          "Playlist",
          bufferId,
          {
            title,
            exerciseId
          },
          uploadResponse => {
            dispatch(
              actions.cache.add(
                "PlaylistItem",
                {
                  authorId: currentUser.id,
                  exerciseId
                },
                uploadResponse
              )
            );
            onReloadPlaylistSummaries();
            onClose();
          }
        )
      );
    };

    return (
      <DialogContent title="プレイリストに追加" onClose={onClose}>
        {!isEditoOpen ? (
          <>
            <Button icon={<Add />} label="新規作成" onClick={onToggleEditor} />
            <Column pb={1}>
              <ExerciseContext.Provider value={exerciseId}>
                <TogglePlaylistItemList
                  initialParams={{
                    authorId: currentUser.id
                  }}
                  onReload={onReloadPlaylistItems}
                />
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
