import { Add, CloudUpload, PlaylistPlay } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useSearch } from "../../../hooks/useSearch";
import { useToggleState } from "../../../hooks/useToggleState";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { ExerciseContext, TogglePlaylistItemList } from "../../lists/playlist-summaries/TogglePlaylistItemList";
import { Button, Card, TextField } from "../../ui";

export const PlaylistItemsDialog = createDialog<{
  exerciseId: string;
}>()(
  React.memo(({ t }) => t("プレイリストに追加")),
  React.memo(({ exerciseId, onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useCurrentUser();

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

    return !isEditoOpen ? (
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
    );
  })
);
