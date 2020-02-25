import { Add, CloudUpload, PlaylistPlay } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useSearch } from "../../../hooks/useSearch";
import { useToggleState } from "../../../hooks/useToggleState";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { TogglePlaylistItemList } from "../../lists/playlist-summaries/TogglePlaylistItemList";
import { Button, Card, TextField } from "../../ui";

export const PlaylistItemsDialog = createDialog<{
  exerciseId: EntityId<"Exercise">;
}>()(
  React.memo(({ t }) => t("プレイリストに追加")),
  React.memo(({ exerciseId, onClose }) => {
    const dispatch = useDispatch();
    const { currentUserId } = useCurrentUser();

    const [isEditoOpen, onToggleEditor] = useToggleState();
    const [title, setTitle] = useState("新しいプレイリスト");

    const { onReload: onReloadPlaylistSummaries } = useSearch("PlaylistSummary", {
      authorId: currentUserId
    });
    const { onReload: onReloadPlaylistItems } = useSearch("PlaylistItem", {
      authorId: currentUserId,
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
                  authorId: currentUserId,
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
        <TogglePlaylistItemList
          initialParams={{
            authorId: currentUserId
          }}
          exerciseId={exerciseId}
          onReload={onReloadPlaylistItems}
        />
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
