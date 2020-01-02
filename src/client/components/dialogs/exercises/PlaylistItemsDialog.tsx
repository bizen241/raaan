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
import { Button, Card, DialogContent, TextField } from "../../ui";

export const PlaylistItemsDialog = createDialog<{
  exerciseId: string;
}>(
  React.memo(({ exerciseId, onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const [isEditoOpen, onToggleEditor] = useToggleState();
    const [title, setTitle] = useState("新しいプレイリスト");

    const { onReload: onReloadPlaylistSummaries } = useSearch("PlaylistSummary", {
      authorId: currentUser.id
    });
    const { onReload: onReloadPlaylistItems } = useSearch("PlaylistItem", {
      authorId: currentUser.id,
      exerciseId
    });

    const onUpdateTitle = useCallback((value: string) => {
      setTitle(value);
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
            <Button icon={<Add />} label="新しいプレイリストを作る" onClick={onToggleEditor} />
            <ExerciseContext.Provider value={exerciseId}>
              <TogglePlaylistItemList
                initialParams={{
                  authorId: currentUser.id
                }}
                onReload={onReloadPlaylistItems}
              />
            </ExerciseContext.Provider>
          </>
        ) : (
          <>
            <Card icon={<PlaylistPlay />} title="プレイリストを作る">
              <TextField label="題名" defaultValue={title} onChange={onUpdateTitle} />
            </Card>
            <Button icon={<CloudUpload />} label="プレイリストをアップロード" onClick={onUploadPlaylist} />
          </>
        )}
      </DialogContent>
    );
  })
);
